# EatUp — API Specification

> **Version:** 1.0  
> **Base URL:** `https://eatup-backend-byng.onrender.com/api/v1`  
> **Source of truth:** Frontend service layer (`frontend/src/lib/`)

This document defines every HTTP API contract required by the EatUp web application, including request/response JSON payloads, shared types, authentication rules, and error handling. It is intended for backend implementers, frontend developers, and API consumers.

---

## Table of Contents

1. [Overview](#overview)
2. [Global Conventions](#global-conventions)
3. [Shared Types](#shared-types)
4. [Authentication](#authentication)
5. [Vendor — Profile & Onboarding](#vendor--profile--onboarding)
6. [Vendor — Orders](#vendor--orders)
7. [Vendor — Dashboard, Analytics & Payments](#vendor--dashboard-analytics--payments)
8. [Vendor — Notifications](#vendor--notifications)
9. [Vendor — Menu (Legacy)](#vendor--menu-legacy)
10. [Shops](#shops)
11. [Products](#products)
12. [Reference Data](#reference-data)
13. [Uploads](#uploads)
14. [Admin](#admin)
15. [Local / Stub Endpoints](#local--stub-endpoints)
16. [Feature → Endpoint Map](#feature--endpoint-map)
17. [Known Gaps](#known-gaps)

---

## Overview

| Property | Value |
|----------|-------|
| Protocol | HTTPS |
| Format | JSON (`application/json`) unless noted |
| Auth scheme | Bearer JWT (`Authorization: Bearer <token>`) |
| Response envelope | `{ success?, message?, data: T }` |
| Timeout | 30 seconds (client default) |
| Mock mode | Set `NEXT_PUBLIC_MOCK_VIEW=true` to bypass backend |

### Environment Variables

```env
NEXT_PUBLIC_MOCK_VIEW=true|false
NEXT_PUBLIC_API_BASE_URL=https://eatup-backend-byng.onrender.com/api/v1
NEXT_PUBLIC_RIDER_APP_URL=https://eatup.app/download
```

---

## Global Conventions

### Request Headers

| Header | Value | When |
|--------|-------|------|
| `Content-Type` | `application/json` | All JSON requests (default) |
| `Authorization` | `Bearer <accessToken>` | Protected routes (auto-attached from `localStorage`) |
| `Authorization` | `Bearer <registrationToken>` | `POST /auth/create-account` only |
| `Content-Type` | `multipart/form-data` | File uploads (CAC document, shop picture) |

### Response Envelope

All successful API responses follow this structure. Service functions in the frontend unwrap `response.data.data`.

```typescript
interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}
```

### Error Responses

On failure, the backend should return an HTTP error status with:

```typescript
interface ApiErrorResponse {
  success: false;
  message: string;          // Human-readable error (surfaced to UI)
  errors?: Record<string, string[]>;  // Optional field-level validation errors
}
```

**HTTP status codes used by the client:**

| Code | Behavior |
|------|----------|
| `400` | Bad request / validation error |
| `401` | Unauthorized — triggers token refresh or redirect to login |
| `403` | Forbidden |
| `404` | Resource not found |
| `409` | Conflict (e.g. duplicate email) |
| `422` | Unprocessable entity |
| `500` | Internal server error |

### Token Refresh (Automatic)

On `401`, the client attempts:

```
POST /auth/refresh
Body: { "refreshToken": "<refreshToken>" }
```

If refresh succeeds, the original request is retried once. If refresh fails, the user is redirected to `/auth/login?role=vendor`.

### Pagination (List Endpoints)

List endpoints that support pagination accept:

```typescript
interface PaginationQuery {
  page?: number;    // default: 1
  limit?: number;   // default: 20
}
```

Paginated responses should return:

```typescript
interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
```

> **Note:** Some list endpoints currently return a bare array. The frontend handles both `T[]` and `{ items: T[] }` / `{ orders: T[] }` / `{ products: T[] }` shapes.

### ID Fields

Entities may expose `id` and/or `_id`. The frontend normalizes with `entity.id || entity._id`.

---

## Shared Types

```typescript
// ─── Roles ───────────────────────────────────────────────────

type UserRole = 'USER' | 'VENDOR' | 'RIDER' | 'ADMIN';

type OnboardingStatus = 'PENDING' | 'APPROVED' | 'COMPLETE' | 'PENDING_REVIEW' | 'DRAFT';

// ─── User ────────────────────────────────────────────────────

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
  role: UserRole;
  onboardingStatus?: OnboardingStatus;
  profilePicture?: string | null;
  dob?: string;              // ISO date string
  favoriteFood?: string;
  createdAt?: string;        // ISO datetime
  updatedAt?: string;
}

// ─── Address ─────────────────────────────────────────────────

interface AddressInput {
  address: string;
  latitude: number;
  longitude: number;
}

interface Address extends AddressInput {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Auth Tokens ─────────────────────────────────────────────

interface AuthTokens {
  accessToken?: string;
  token?: string;            // alias for accessToken (login response)
  refreshToken?: string;
  tokenType?: 'Bearer';
}

interface LoginResult extends AuthTokens {
  user?: User;
  requiresOtp?: boolean;     // true → client must call verify-otp before session
}

// ─── Opening Hours ───────────────────────────────────────────

/** Backend format: short day keys, time range string */
type OpeningHoursMap = Record<
  'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun',
  string                  // e.g. "08:00-21:00"
>;

// ─── File Upload Result ──────────────────────────────────────

interface UploadedDocument {
  url?: string;
  fileKey: string;
  fileUrl: string;
  fileType?: string;
}

interface ShopPictureUploadResult {
  pictureUrl: string;
}

// ─── Document Reference (onboarding) ─────────────────────────

interface DocumentReference {
  fileKey: string;
  fileUrl: string;
  fileType: string;          // MIME type, e.g. "application/pdf"
}
```

---

## Authentication

### `POST /auth/register`

Register a new user account.

| | |
|---|---|
| **Auth** | Public |
| **Used by** | Vendor signup (`step0.jsx`), rider registration service |

**Request body:**

```typescript
interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  countryCode?: string;      // e.g. "+234"
  password: string;          // min 6 characters (client validation)
  role: 'VENDOR' | 'RIDER' | 'USER';
}
```

**Response `data`:**

```typescript
interface RegisterResponse extends AuthTokens {
  accessToken: string;
  refreshToken: string;
  user?: User;
}
```

**Example:**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "usr_abc123",
      "firstName": "Mama",
      "lastName": "Titi",
      "email": "vendor@eatup.ng",
      "role": "VENDOR",
      "onboardingStatus": "PENDING"
    }
  }
}
```

---

### `POST /auth/login`

Authenticate an existing user.

| | |
|---|---|
| **Auth** | Public |
| **Used by** | Login page (all roles) |

**Request body:**

```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

**Response `data`:**

```typescript
interface LoginResponse extends AuthTokens {
  token: string;             // access token
  refreshToken?: string;
  tokenType?: 'Bearer';
  requiresOtp?: boolean;     // if true, proceed to OTP verification
  user?: User;
}
```

**Example (OTP required):**

```json
{
  "success": true,
  "data": {
    "requiresOtp": true,
    "token": null
  }
}
```

**Example (direct login):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "tokenType": "Bearer",
    "user": {
      "id": "usr_abc123",
      "firstName": "Mama",
      "lastName": "Titi",
      "email": "vendor@eatup.ng",
      "role": "VENDOR"
    }
  }
}
```

---

### `POST /auth/send-otp`

Send a one-time password to the user's email.

| | |
|---|---|
| **Auth** | Public |
| **Used by** | Customer signup |

**Request body:**

```typescript
interface SendOtpRequest {
  email: string;
}
```

**Response `data`:** `null` or empty object

**Example:**

```json
{
  "success": true,
  "message": "OTP sent to user@example.com",
  "data": null
}
```

---

### `POST /auth/verify-otp`

Verify OTP code. Behavior differs by flow:

| Flow | Token returned | Persisted as session? |
|------|----------------|----------------------|
| Login 2FA | Full access `token` | Yes |
| Registration | Short-lived `registrationToken` | No — used for `create-account` |

| | |
|---|---|
| **Auth** | Public |
| **Used by** | Login 2FA, customer signup |

**Request body:**

```typescript
interface VerifyOtpRequest {
  email: string;
  otp: string;               // 6-digit code
}
```

**Response `data` (login flow):**

```typescript
interface VerifyOtpLoginResponse extends AuthTokens {
  token: string;
  refreshToken?: string;
  user?: User;
}
```

**Response (registration flow — full envelope, not unwrapped by service):**

```typescript
interface VerifyOtpRegistrationResponse {
  success: boolean;
  message?: string;
  data: {
    token: string;           // registration token (short-lived)
    tokenType: 'Bearer';
  };
}
```

---

### `POST /auth/create-account`

Complete customer registration after OTP verification.

| | |
|---|---|
| **Auth** | `Bearer <registrationToken>` |
| **Used by** | Customer complete-profile page |

**Request body:**

```typescript
interface CreateAccountRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  dob?: string;              // ISO date
  role: 'USER';
  favoriteFood?: string;
  addresses?: AddressInput[];
}
```

**Response `data`:**

```typescript
interface CreateAccountResponse extends AuthTokens {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}
```

**Example:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "usr_xyz789",
      "firstName": "Amara",
      "lastName": "Okafor",
      "email": "customer@eatup.ng",
      "role": "USER"
    }
  }
}
```

---

### `POST /auth/refresh`

Refresh an expired access token.

| | |
|---|---|
| **Auth** | Public (refresh token in body) |
| **Used by** | HTTP interceptor (automatic), `api.auth.refresh` |

**Request body:**

```typescript
interface RefreshTokenRequest {
  refreshToken: string;
}
```

**Response `data`:**

```typescript
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;     // rotated refresh token (optional)
}
```

---

### `POST /auth/logout`

Invalidate refresh token and end session.

| | |
|---|---|
| **Auth** | Bearer |
| **Used by** | `api.auth.logout` (defined, not yet wired in UI) |

**Request body:**

```typescript
interface LogoutRequest {
  refreshToken: string;
}
```

**Response `data`:** `{ success: true }` or empty

---

### `GET /auth/me`

Get the authenticated user's profile.

| | |
|---|---|
| **Auth** | Bearer |
| **Used by** | Post-login profile fetch |

**Response `data`:** `User`

---

### `PUT /auth/me`

Update the authenticated user's profile.

| | |
|---|---|
| **Auth** | Bearer |
| **Used by** | `api.auth.updateProfile` (defined, no UI yet) |

**Request body (all fields optional):**

```typescript
interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dob?: string;
  favoriteFood?: string;
  profilePicture?: string;   // URL
}
```

**Response `data`:** `User`

---

### `GET /auth/me/addresses`

List user addresses.

| | |
|---|---|
| **Auth** | Bearer |

**Response `data`:** `Address[]`

---

### `POST /auth/me/addresses`

Add a new address.

| | |
|---|---|
| **Auth** | Bearer |

**Request body:** `AddressInput`  
**Response `data`:** `Address`

---

### `PUT /auth/me/addresses/:addressId`

Update an existing address.

| | |
|---|---|
| **Auth** | Bearer |

**Request body:** `AddressInput`  
**Response `data`:** `Address`

---

### `DELETE /auth/me/addresses/:addressId`

Delete an address.

| | |
|---|---|
| **Auth** | Bearer |

**Response `data`:** `{ deleted: true }`

---

### `POST /auth/me/change-password`

Change the user's password.

| | |
|---|---|
| **Auth** | Bearer |

**Request body:**

```typescript
interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
```

**Response `data`:** `{ success: true }`

---

## Vendor — Profile & Onboarding

### Pre-Approval Profile (`/vendor/profile`)

#### `POST /vendor/profile`

Submit initial vendor profile.

| | |
|---|---|
| **Auth** | Bearer |

**Request body:** `VendorProfileInput` (opaque — backend-defined fields)  
**Response `data`:** `VendorProfile`

#### `PUT /vendor/profile`

Update vendor profile (pre-approval).

**Request body:** `Partial<VendorProfileInput>`  
**Response `data`:** `VendorProfile`

#### `GET /vendor/profile`

Fetch vendor profile.

| | |
|---|---|
| **Used by** | Vendor dashboard (`DashboardWrapper`) |

**Response `data`:**

```typescript
interface VendorProfile {
  businessName?: string;
  phone?: string;
  address?: string;
  description?: string;
  licenseNumber?: string;
  categories?: string[];
  settlementAccount?: SettlementAccount;
  status?: string;
}
```

#### `POST /vendor/profile/cac-document`

Upload CAC (Corporate Affairs Commission) verification document.

| | |
|---|---|
| **Auth** | Bearer |
| **Content-Type** | `multipart/form-data` |
| **Used by** | Vendor onboarding step 3 |

**Request (FormData):**

| Field | Type | Constraints |
|-------|------|-------------|
| `file` | `File` | JPEG, PNG, or PDF; max 10 MB |

**Response `data`:** `UploadedDocument`

```json
{
  "success": true,
  "data": {
    "fileKey": "vendor-verification/abc123.pdf",
    "fileUrl": "https://res.cloudinary.com/eatup/abc123.pdf",
    "url": "https://res.cloudinary.com/eatup/abc123.pdf"
  }
}
```

#### `POST /vendor/profile/verify-business-number`

Trigger business number verification.

**Response `data`:**

```typescript
interface VerificationResult {
  verified: boolean;
  message?: string;
}
```

#### `POST /vendor/profile/verify-settlement-account`

Verify bank settlement account via Paystack.

**Request body:**

```typescript
interface VerifySettlementAccountRequest {
  bankCode: string;
  accountNumber: string;
}
```

**Response `data`:**

```typescript
interface SettlementVerificationResult {
  verified: boolean;
  accountName?: string;
}
```

#### `POST /vendor/profile/paystack-subaccount`

Create a Paystack subaccount for settlements.

**Response `data`:**

```typescript
interface PaystackSubaccountResult {
  subaccountCode: string;
}
```

---

### Post-Approval Profile (`/vendor/me`)

#### `GET /vendor/me`

**Response `data`:**

```typescript
interface VendorMe {
  businessName?: string;
  phone?: string;
  address?: string;
  description?: string;
}
```

#### `PATCH /vendor/me`

**Request body:** `Partial<VendorMe>`  
**Response `data`:** `VendorMe`

---

### Onboarding Flow (`/vendor/onboarding`)

Multi-step vendor onboarding. All endpoints require Bearer auth.

```typescript
interface OnboardingDraft {
  onboardingId: string;
  status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  step1?: { categories: string[] };
  step2?: OnboardingStep2Data;
  step3?: OnboardingStep3Data;
  otpVerified?: boolean;
}

interface OnboardingStep2Data {
  businessName: string;
  address: string;
  phone: string;
  email: string;
  countryCode: string;       // e.g. "+234"
}

interface OnboardingStep3Data {
  description: string;
  licenseNumber: string;
  document: DocumentReference;
}
```

| Method | Path | Description | Used by |
|--------|------|-------------|---------|
| `POST` | `/vendor/onboarding/start` | Initialize onboarding session | `step1.jsx` |
| `GET` | `/vendor/onboarding/me` | Get current draft | `api.vendor.onboarding.getDraft` |
| `PATCH` | `/vendor/onboarding/step-1` | Save food categories | `step1.jsx` |
| `PATCH` | `/vendor/onboarding/step-2` | Save business details | `step2.jsx` |
| `PATCH` | `/vendor/onboarding/step-3` | Save verification docs | `step3.jsx` |
| `POST` | `/vendor/onboarding/otp/send` | Send OTP | `step4.jsx` |
| `POST` | `/vendor/onboarding/otp/verify` | Verify OTP | `step4.jsx` |
| `POST` | `/vendor/onboarding/submit` | Submit for admin review | `step5.jsx` |
| `GET` | `/vendor/onboarding/status` | Check onboarding status | `api.vendor.onboarding.getStatus` |

#### `POST /vendor/onboarding/start`

**Response `data`:**

```typescript
interface StartOnboardingResponse {
  onboardingId: string;
}
```

#### `PATCH /vendor/onboarding/step-1`

**Request body:**

```typescript
interface OnboardingStep1Request {
  onboardingId: string;
  categories: string[];      // e.g. ["Jollof Rice", "Soups", "Grills"]
}
```

**Response `data`:**

```typescript
interface OnboardingStep1Response {
  onboardingId: string;
  categories: string[];
}
```

#### `PATCH /vendor/onboarding/step-2`

**Request body:**

```typescript
interface OnboardingStep2Request {
  onboardingId: string;
  businessName: string;
  address: string;
  phone: string;
  email: string;
  countryCode: string;
}
```

**Response `data`:** `OnboardingStep2Request` (echoed)

#### `PATCH /vendor/onboarding/step-3`

**Request body:**

```typescript
interface OnboardingStep3Request {
  onboardingId: string;
  description: string;
  licenseNumber: string;
  document: DocumentReference;
}
```

**Response `data`:** `OnboardingStep3Request` (echoed)

#### `POST /vendor/onboarding/otp/send`

**Request body:**

```typescript
interface OnboardingOtpSendRequest {
  onboardingId: string;
  channel: 'sms' | 'email';
  target: string;            // phone number or email
}
```

**Response `data`:**

```typescript
interface OnboardingOtpSendResponse {
  otpSessionId: string;
  onboardingId: string;
}
```

#### `POST /vendor/onboarding/otp/verify`

**Request body:**

```typescript
interface OnboardingOtpVerifyRequest {
  onboardingId: string;
  otpSessionId: string;
  code: string;              // 6-digit OTP
}
```

**Response `data`:**

```typescript
interface OnboardingOtpVerifyResponse {
  verified: boolean;
  onboardingId: string;
  otpSessionId: string;
}
```

#### `POST /vendor/onboarding/submit`

**Request body:**

```typescript
interface OnboardingSubmitRequest {
  onboardingId: string;
}
```

**Response `data`:**

```typescript
interface OnboardingSubmitResponse {
  onboardingId: string;
  status: 'PENDING_REVIEW' | string;
}
```

#### `GET /vendor/onboarding/status`

**Response `data`:**

```typescript
interface OnboardingStatusResponse {
  status: string;            // e.g. "PENDING_REVIEW", "APPROVED", "REJECTED"
}
```

---

## Vendor — Orders

```typescript
type OrderStatus =
  | 'pending'
  | 'new'
  | 'preparing'
  | 'delivering'
  | 'completed'
  | 'delivered'
  | 'cancelled';

type DeliveryType = 'delivery' | 'pickup';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;             // unit price in smallest currency unit (kobo)
  notes?: string;
}

interface Order {
  id: string;
  _id?: string;
  customer: string;
  customerPhone?: string;
  total: number;             // total in smallest currency unit (kobo)
  status: OrderStatus;
  deliveryType: DeliveryType;
  timestamp: string;         // ISO 8601 datetime
  address?: string;
  notes?: string;
  items: OrderItem[];
}
```

### `GET /vendor/orders`

List vendor orders.

| | |
|---|---|
| **Auth** | Bearer |
| **Query params** | `limit`, `status`, `page`, and any filter key-value pairs |
| **Used by** | `useRealTimeOrders`, dashboard |

**Response `data`:** `Order[]` or `{ orders: Order[] }`

---

### `GET /vendor/orders/:orderId`

Get a single order.

| | |
|---|---|
| **Auth** | Bearer |

**Response `data`:** `Order`

---

### `PATCH /vendor/orders/:orderId/status`

Update order status.

| | |
|---|---|
| **Auth** | Bearer |
| **Used by** | `useRealTimeOrders` (accept → `preparing`, ready → `delivering`, complete → `completed`) |

**Request body:**

```typescript
interface UpdateOrderStatusRequest {
  status: OrderStatus;
}
```

**Response `data`:** `Order`

**Status transitions used by the UI:**

| Action | New status |
|--------|------------|
| Accept order | `preparing` |
| Mark ready | `delivering` |
| Complete | `completed` |

---

## Vendor — Dashboard, Analytics & Payments

### `GET /vendor/dashboard/stats`

Dashboard summary metrics.

| | |
|---|---|
| **Auth** | Bearer |
| **Used by** | `DashboardWrapper`, analytics fallback |

**Response `data`:**

```typescript
interface DashboardStats {
  totalOrders: number;
  cancelledOrders: number;
  totalRevenue: number;      // in kobo
  pendingOrders: number;
}
```

**Example:**

```json
{
  "success": true,
  "data": {
    "totalOrders": 128,
    "cancelledOrders": 6,
    "totalRevenue": 485000,
    "pendingOrders": 2
  }
}
```

---

### `GET /vendor/analytics/overview`

Detailed analytics for the vendor dashboard.

| | |
|---|---|
| **Auth** | Bearer |
| **Query params** | `range`: `'1d'` \| `'7d'` \| `'30d'` (default: `'7d'`) |
| **Used by** | Analytics page (`useAnalytics`) |

**Response `data`:**

```typescript
interface MetricCard {
  label: string;
  current: number;
  previous: number;
  change: number;            // percentage change
  trend: 'up' | 'down';
}

interface DailyRevenuePoint {
  date: string;              // ISO date "YYYY-MM-DD"
  revenue: number;
  orders: number;
}

interface WeeklyComparisonPoint {
  week: string;              // e.g. "Week 1"
  revenue: number;
  orders: number;
}

interface CategoryRevenuePoint {
  category: string;
  revenue: number;
  percentage: number;
}

interface TopItemPoint {
  name: string;
  orders: number;
  revenue: number;
}

interface HeatmapPoint {
  day: string;               // e.g. "Mon"
  hour: number;              // 0–23
  value: number;
}

interface FunnelStage {
  stage: string;             // e.g. "Placed", "Accepted", "Preparing", "Delivered"
  count: number;
}

interface Insight {
  type: 'info' | 'success' | 'warning';
  message: string;
}

interface AnalyticsOverview {
  metrics: Record<string, MetricCard>;
  dailyRevenue: DailyRevenuePoint[];
  weeklyComparison: WeeklyComparisonPoint[];
  categoryRevenue: CategoryRevenuePoint[];
  topItems: TopItemPoint[];
  heatmapData: HeatmapPoint[];
  funnel: FunnelStage[];
  insights: Insight[];
}
```

---

### `GET /vendor/payments`

Payment history and settlement summary.

| | |
|---|---|
| **Auth** | Bearer |
| **Query params** | Optional filters (passed through) |
| **Used by** | Payments page (`usePaymentsManagement`) |

**Response `data`:**

```typescript
type PaymentMethod = 'card' | 'transfer' | string;
type TransactionStatus = 'completed' | 'failed' | 'pending' | string;
type SettlementStatus = 'settled' | 'pending' | string;

interface PaymentSummary {
  availableBalance: number;
  pendingSettlement: number;
  totalProcessed: number;
  lastSettlementDate: string;    // ISO datetime
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  schedule?: string;             // e.g. "Daily"
  nextSettlement?: string;       // ISO datetime
}

interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  customerEmail?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  settlementStatus: SettlementStatus;
  date: string;                  // ISO datetime
}

interface PaymentsResponse {
  summary: PaymentSummary;
  transactions: Transaction[];
}
```

---

## Vendor — Notifications

```typescript
type NotificationType = 'success' | 'warning' | 'error' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;         // ISO datetime
}
```

### `GET /vendor/notifications`

| | |
|---|---|
| **Auth** | Bearer |
| **Used by** | `api.vendor.notifications.list` (defined; UI currently derives notifications from orders) |

**Response `data`:** `Notification[]`

---

## Vendor — Menu (Legacy)

> **Important:** The UI uses the **Products API** (`/products/*`) for menu management. These `/vendor/menu` endpoints are defined in the service layer but are not consumed by current pages. Implement for backward compatibility or deprecate in favor of Products.

```typescript
interface MenuItem {
  id: string;
  _id?: string;
  shopId?: string;
  name: string;
  price: number;
  description?: string;
  category: string | { name: string };
  productPicture?: string | null;
  isAvailable: boolean;
}

interface MenuItemInput {
  name: string;
  price: number;
  description?: string;
  category: string;
  productPicture?: string;
  isAvailable?: boolean;
}
```

| Method | Path | Body | Response `data` |
|--------|------|------|-----------------|
| `GET` | `/vendor/menu` | — | `MenuItem[]` |
| `POST` | `/vendor/menu/items` | `MenuItemInput` | `MenuItem` |
| `PATCH` | `/vendor/menu/items/:menuItemId` | `Partial<MenuItemInput>` | `MenuItem` |
| `DELETE` | `/vendor/menu/items/:menuItemId` | — | `{ deleted: true }` |

---

## Shops

```typescript
type ShopStatus = 'PENDING' | 'APPROVED' | 'SUSPENDED' | string;

interface Shop {
  id: string;
  _id?: string;
  name: string;
  description?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  pictureUrl?: string | null;
  isOpen?: boolean;
  openingHours?: OpeningHoursMap;
  socialMediaHandles?: Record<string, string>;
  status?: ShopStatus;
  vendorId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ShopCreateRequest {
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
}

interface ShopUpdateRequest {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  openingHours: OpeningHoursMap;
  socialMediaHandles?: Record<string, string>;
  website?: string;
  contactPhone: string;
  contactEmail: string;
  isOpen: boolean;
}
```

### Shop Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/shops` | Bearer | Create a new shop |
| `PUT` | `/shops/:shopId` | Bearer | Update shop details |
| `POST` | `/shops/:shopId/picture` | Bearer | Upload shop cover image |
| `POST` | `/shops/:shopId/submit` | Bearer | Submit shop for admin approval |
| `GET` | `/shops/:shopId` | Bearer / Public | Get shop by ID |
| `GET` | `/shops` | Public | List shops (paginated) |
| `GET` | `/shops/nearby` | Public | Geo-filtered shop list |
| `POST` | `/shops/:shopId/save` | Bearer | Bookmark shop (customer) |
| `DELETE` | `/shops/:shopId/save` | Bearer | Remove bookmark |
| `GET` | `/shops/:shopId/products` | Public | Products under a shop |
| `GET` | `/shops/my` | Bearer | Vendor's own shops |

#### `GET /shops`

**Query params:**

```typescript
interface ListShopsQuery extends PaginationQuery {
  status?: ShopStatus;
  search?: string;
}
```

**Response `data`:** `Shop[]` or `PaginatedResponse<Shop>`

#### `GET /shops/nearby`

**Query params:**

```typescript
interface NearbyShopsQuery {
  lat: number;
  lng: number;
  radius?: number;           // meters, default: 5000
}
```

**Response `data`:** `Shop[]`

#### `POST /shops/:shopId/picture`

**Content-Type:** `multipart/form-data`

| Field | Type | Constraints |
|-------|------|-------------|
| `file` | `File` | JPEG, PNG, or WebP; max 5 MB |

**Response `data`:** `ShopPictureUploadResult`

#### `POST /shops/:shopId/submit`

**Response `data`:**

```typescript
interface ShopSubmitResponse {
  status: 'PENDING';
  shopId: string;
}
```

#### `GET /shops/my`

| | |
|---|---|
| **Used by** | Dashboard, menu page, profile page |

**Response `data`:** `Shop[]`

---

## Products

```typescript
interface Product {
  id: string;
  _id?: string;
  shopId: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  description?: string;
  category: string | { id?: string; name: string };
  productPicture?: string | null;
  image?: string;
  isAvailable: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  tags?: string[];
  preparationTime?: number;  // minutes
  createdAt?: string;
  updatedAt?: string;
}

interface ProductCreateRequest {
  shopId: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number | null;
  category: string;
  preparationTime?: number;
  tags?: string[];
  isAvailable?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  image?: string;
  productPicture?: string;
}

interface ProductUpdateRequest extends Partial<ProductCreateRequest> {
  isAvailable?: boolean;
}
```

### Product Endpoints

| Method | Path | Auth | Used by |
|--------|------|------|---------|
| `POST` | `/products` | Bearer | Menu page — add item |
| `PUT` | `/products/:productId` | Bearer | Menu page — edit / toggle availability |
| `DELETE` | `/products/:productId` | Bearer | Menu page — delete item |
| `GET` | `/products/:productId` | Public | `api.products.getById` |
| `GET` | `/products/shop/:shopId` | Public | Menu page, dashboard |
| `GET` | `/products/shop/:shopId/category/:category` | Public | Category filter |
| `GET` | `/products/search` | Public | Name search |

#### `GET /products/shop/:shopId`

**Response `data`:** `Product[]` or `{ products: Product[] }`

#### `GET /products/search`

**Query params:**

```typescript
interface ProductSearchQuery {
  name: string;
  shopId?: string;
}
```

**Response `data`:** `Product[]`

---

## Reference Data

Public endpoints — no authentication required.

### `GET /reference/vendor-categories`

Food categories for vendor onboarding and menu.

| | |
|---|---|
| **Used by** | `api.reference.getVendorCategories`, `api.products.getCategories` |

**Response `data`:** `string[]`

**Example:**

```json
{
  "success": true,
  "data": [
    "Jollof Rice",
    "Soups",
    "Grills",
    "Swallow",
    "Sides",
    "Drinks",
    "Pastries"
  ]
}
```

---

### `GET /reference/country-codes`

International dialing codes.

| | |
|---|---|
| **Used by** | `api.reference.getCountryCodes` (defined; signup pages currently use local static data) |

**Response `data`:**

```typescript
interface CountryCode {
  code: string;              // e.g. "+234"
  country: string;           // e.g. "Nigeria"
  flag: string;              // emoji flag
}
```

**Example:**

```json
{
  "success": true,
  "data": [
    { "code": "+234", "country": "Nigeria", "flag": "🇳🇬" },
    { "code": "+233", "country": "Ghana", "flag": "🇬🇭" }
  ]
}
```

---

## Uploads

### `POST /uploads/presign`

Request a presigned Cloudinary upload URL.

| | |
|---|---|
| **Auth** | Bearer |
| **Used by** | `api.uploads.getPresignedUrl` (documented pattern; not yet wired in UI) |

**Request body:**

```typescript
type UploadFolder = 'vendor-verification' | 'shop-pictures' | 'product-images';

interface PresignRequest {
  fileName: string;
  contentType: string;       // MIME type
  folder: UploadFolder;
}
```

**Response `data`:**

```typescript
interface PresignedUpload {
  uploadUrl: string;         // Cloudinary upload endpoint
  apiKey: string;
  timestamp: string;
  signature: string;
  folder: string;
  publicId: string;
}
```

**Client upload flow (after presign):**

```
POST <uploadUrl>
Content-Type: multipart/form-data

Fields:
  file        → binary
  api_key     → details.apiKey
  timestamp   → details.timestamp
  signature   → details.signature
  folder      → details.folder
  public_id   → details.publicId
```

Cloudinary response provides `secure_url` for the uploaded asset.

---

## Admin

All admin endpoints require `user.role === 'ADMIN'`. The frontend enforces this client-side before calling; the backend must also enforce server-side.

### Vendor Administration

```typescript
interface AdminVendorSummary {
  id: string;
  businessName: string;
  email: string;
  phone?: string;
  status: string;
  submittedAt?: string;
}

interface AdminVendorDetail extends AdminVendorSummary {
  licenseNumber?: string;
  document?: DocumentReference;
  settlementAccount?: SettlementAccount;
  categories?: string[];
}

interface SettlementAccount {
  bankCode: string;
  accountNumber: string;
  accountName?: string;
}

interface RejectRequest {
  reason: string;
}
```

| Method | Path | Body | Response `data` |
|--------|------|------|-----------------|
| `GET` | `/vendor/admin/vendors` | — | `AdminVendorSummary[]` |
| `GET` | `/vendor/admin/vendors/:vendorProfileId` | — | `AdminVendorDetail` |
| `POST` | `/vendor/admin/vendors/:vendorProfileId/verify-business-number` | — | `VerificationResult` |
| `POST` | `/vendor/admin/vendors/:vendorProfileId/approve` | — | `{ status: 'APPROVED' }` |
| `POST` | `/vendor/admin/vendors/:vendorProfileId/reject` | `RejectRequest` | `{ status: 'REJECTED' }` |

### Shop Administration

```typescript
interface AdminShopSummary {
  id: string;
  name: string;
  vendorId: string;
  status: ShopStatus;
  submittedAt?: string;
}
```

| Method | Path | Query / Body | Response `data` |
|--------|------|--------------|-----------------|
| `GET` | `/shops/admin` | `?status=PENDING` (default) | `AdminShopSummary[]` |
| `POST` | `/shops/admin/:shopId/approve` | — | `{ status: 'APPROVED' }` |
| `POST` | `/shops/admin/:shopId/reject` | `RejectRequest` | `{ status: 'REJECTED' }` |
| `POST` | `/shops/admin/:shopId/suspend` | `RejectRequest` | `{ status: 'SUSPENDED' }` |

---

## Local / Stub Endpoints

These are **not** part of the EatUp backend. They are Next.js API routes or client-only storage.

### `POST /api/auth/rider/signup` (Next.js)

| | |
|---|---|
| **Host** | Frontend Next.js server |
| **File** | `frontend/src/app/api/auth/rider/signup/route.js` |
| **Used by** | Rider signup page |

**Request body:**

```typescript
interface RiderSignupRequest {
  name: string;
  phone: string;
  countryCode: string;
  vehicleType: 'bike' | 'bicycle' | 'scooter' | 'car';
}
```

**Response (201):**

```typescript
interface RiderSignupResponse {
  success: true;
  message: string;
  user: {
    name: string;
    role: 'rider';
  };
}
```

**Error (500):**

```typescript
interface RiderSignupError {
  success: false;
  message: string;
}
```

> **Note:** The backend equivalent is `POST /auth/register` with `role: 'RIDER'`. The rider web flow does not call it yet.

### Vendor Settings (No API)

`useSettingsManagement` persists to `localStorage` key `eatup_vendor_settings`. No backend endpoints exist for team, security, billing, or integration settings.

---

## Feature → Endpoint Map

| Feature / Page | Endpoints |
|----------------|-----------|
| **Vendor register (step 0)** | `POST /auth/register` |
| **Vendor register (steps 1–5)** | `/vendor/onboarding/*`, `POST /vendor/profile/cac-document` |
| **Login (all roles)** | `POST /auth/login`, `POST /auth/verify-otp` |
| **Customer signup** | `POST /auth/send-otp`, `POST /auth/verify-otp`, `POST /auth/create-account` |
| **Rider signup** | `POST /api/auth/rider/signup` (local stub only) |
| **Vendor dashboard** | `GET /vendor/profile`, `GET /shops/my`, `GET /products/shop/:id`, `GET /vendor/orders`, `GET /vendor/dashboard/stats` |
| **Menu page** | `GET /shops/my`, `GET /products/shop/:id`, `POST/PUT/DELETE /products` |
| **Orders (real-time)** | `GET /vendor/orders`, `PATCH /vendor/orders/:id/status` |
| **Analytics page** | `GET /vendor/analytics/overview` (fallback: `GET /vendor/dashboard/stats`) |
| **Payments page** | `GET /vendor/payments` |
| **Profile page** | `GET /shops/my`, `PUT /shops/:id`, `POST /shops/:id/picture` |
| **Settings page** | None (localStorage) |
| **Auth guard** | localStorage token check only |
| **Admin (future)** | `/vendor/admin/*`, `/shops/admin/*` |

---

## Known Gaps

| # | Issue | Recommendation |
|---|-------|----------------|
| 1 | Dual product systems: `/vendor/menu/*` and `/products/*` both exist | Standardize on `/products/*`; deprecate menu endpoints |
| 2 | `GET /vendor/notifications` implemented but unused | Wire UI or remove endpoint |
| 3 | Presigned upload and reference APIs exported but not consumed | Integrate in file upload flows |
| 4 | Rider flows bypass EatUp backend | Connect rider signup to `POST /auth/register` |
| 5 | Mock vs real register response shape differs | Real API should return `{ success, data }` or frontend should normalize |
| 6 | Settings, team, security have no backend | Define persistence APIs when features go live |
| 7 | List endpoints return inconsistent shapes | Standardize on `PaginatedResponse<T>` or document per-endpoint variants |

---

## Endpoint Summary

| Domain | Count |
|--------|-------|
| Authentication | 14 |
| Vendor profile + `/vendor/me` | 9 |
| Vendor onboarding | 9 |
| Vendor menu (legacy) | 4 |
| Orders | 3 |
| Dashboard / analytics / payments / notifications | 4 |
| Shops | 11 |
| Products | 7 |
| Reference | 2 |
| Uploads | 1 |
| Admin | 9 |
| **EatUp backend total** | **73** |
| Next.js rider stub | 1 |

---

## Complete TypeScript Definitions

For copy-paste into a shared types package:

```typescript
// api.types.ts — EatUp API Contract v1.0

export type UserRole = 'USER' | 'VENDOR' | 'RIDER' | 'ADMIN';
export type OrderStatus = 'pending' | 'new' | 'preparing' | 'delivering' | 'completed' | 'delivered' | 'cancelled';
export type DeliveryType = 'delivery' | 'pickup';
export type NotificationType = 'success' | 'warning' | 'error' | 'info';
export type ShopStatus = 'PENDING' | 'APPROVED' | 'SUSPENDED' | string;
export type UploadFolder = 'vendor-verification' | 'shop-pictures' | 'product-images';

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
  role: UserRole;
  onboardingStatus?: string;
  profilePicture?: string | null;
  dob?: string;
  favoriteFood?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddressInput {
  address: string;
  latitude: number;
  longitude: number;
}

export interface Address extends AddressInput {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthTokens {
  accessToken?: string;
  token?: string;
  refreshToken?: string;
  tokenType?: 'Bearer';
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  countryCode?: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends AuthTokens {
  token: string;
  requiresOtp?: boolean;
  user?: User;
}

export interface SendOtpRequest { email: string; }
export interface VerifyOtpRequest { email: string; otp: string; }

export interface CreateAccountRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  dob?: string;
  role: 'USER';
  favoriteFood?: string;
  addresses?: AddressInput[];
}

export interface RefreshTokenRequest { refreshToken: string; }
export interface RefreshTokenResponse { accessToken: string; refreshToken?: string; }
export interface LogoutRequest { refreshToken: string; }
export interface ChangePasswordRequest { oldPassword: string; newPassword: string; }
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dob?: string;
  favoriteFood?: string;
  profilePicture?: string;
}

export interface DocumentReference {
  fileKey: string;
  fileUrl: string;
  fileType: string;
}

export interface UploadedDocument {
  url?: string;
  fileKey: string;
  fileUrl: string;
  fileType?: string;
}

export interface VendorProfile {
  businessName?: string;
  phone?: string;
  address?: string;
  description?: string;
  licenseNumber?: string;
  categories?: string[];
  status?: string;
}

export interface VendorMe {
  businessName?: string;
  phone?: string;
  address?: string;
  description?: string;
}

export interface OnboardingStep1Request { onboardingId: string; categories: string[]; }
export interface OnboardingStep2Request {
  onboardingId: string;
  businessName: string;
  address: string;
  phone: string;
  email: string;
  countryCode: string;
}
export interface OnboardingStep3Request {
  onboardingId: string;
  description: string;
  licenseNumber: string;
  document: DocumentReference;
}
export interface OnboardingOtpSendRequest {
  onboardingId: string;
  channel: 'sms' | 'email';
  target: string;
}
export interface OnboardingOtpVerifyRequest {
  onboardingId: string;
  otpSessionId: string;
  code: string;
}
export interface OnboardingSubmitRequest { onboardingId: string; }

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  _id?: string;
  customer: string;
  customerPhone?: string;
  total: number;
  status: OrderStatus;
  deliveryType: DeliveryType;
  timestamp: string;
  address?: string;
  notes?: string;
  items: OrderItem[];
}

export interface UpdateOrderStatusRequest { status: OrderStatus; }

export interface DashboardStats {
  totalOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

export interface MetricCard {
  label: string;
  current: number;
  previous: number;
  change: number;
  trend: 'up' | 'down';
}

export interface AnalyticsOverview {
  metrics: Record<string, MetricCard>;
  dailyRevenue: { date: string; revenue: number; orders: number }[];
  weeklyComparison: { week: string; revenue: number; orders: number }[];
  categoryRevenue: { category: string; revenue: number; percentage: number }[];
  topItems: { name: string; orders: number; revenue: number }[];
  heatmapData: { day: string; hour: number; value: number }[];
  funnel: { stage: string; count: number }[];
  insights: { type: 'info' | 'success' | 'warning'; message: string }[];
}

export interface PaymentSummary {
  availableBalance: number;
  pendingSettlement: number;
  totalProcessed: number;
  lastSettlementDate: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  schedule?: string;
  nextSettlement?: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  customerEmail?: string;
  amount: number;
  paymentMethod: string;
  status: string;
  settlementStatus: string;
  date: string;
}

export interface PaymentsResponse {
  summary: PaymentSummary;
  transactions: Transaction[];
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Shop {
  id: string;
  _id?: string;
  name: string;
  description?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  pictureUrl?: string | null;
  isOpen?: boolean;
  openingHours?: Record<string, string>;
  socialMediaHandles?: Record<string, string>;
  status?: ShopStatus;
}

export interface ShopUpdateRequest {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  openingHours: Record<string, string>;
  socialMediaHandles?: Record<string, string>;
  website?: string;
  contactPhone: string;
  contactEmail: string;
  isOpen: boolean;
}

export interface Product {
  id: string;
  _id?: string;
  shopId: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  description?: string;
  category: string | { id?: string; name: string };
  productPicture?: string | null;
  isAvailable: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  tags?: string[];
  preparationTime?: number;
}

export interface ProductCreateRequest {
  shopId: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number | null;
  category: string;
  preparationTime?: number;
  tags?: string[];
  isAvailable?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  image?: string;
  productPicture?: string;
}

export interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

export interface PresignRequest {
  fileName: string;
  contentType: string;
  folder: UploadFolder;
}

export interface PresignedUpload {
  uploadUrl: string;
  apiKey: string;
  timestamp: string;
  signature: string;
  folder: string;
  publicId: string;
}

export interface RejectRequest {
  reason: string;
}
```

---

*Generated from the EatUp frontend service layer. Update this document when adding or changing API contracts.*
