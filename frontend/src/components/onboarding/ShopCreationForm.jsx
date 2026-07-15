"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Shop, Call, Location, DocumentText, Global, Sms, Gps } from 'iconsax-reactjs'
import { useCreateShop } from '@/hooks/useCreateShop'
import {
  geocodeAddress,
  getCurrentPosition,
  reverseGeocode,
} from '@/lib/locationService'
import { validateEmail } from '@/lib/profileUtils'
import {
  buildShopPayload,
  createDefaultBusinessHours,
  validateBusinessHours,
} from '@/lib/shopFormUtils'
import AddressAutocomplete from './AddressAutocomplete'
import BusinessHoursSection from './BusinessHoursSection'
import FormSection from './FormSection'
import ProgressIndicator from './ProgressIndicator'
import SocialMediaSection, {
  createInitialSocialEntries,
  createSocialEntry,
} from './SocialMediaSection'
import { SOCIAL_PLATFORMS } from './socialPlatforms'

const initialForm = {
  name: '',
  address: '',
  latitude: '',
  longitude: '',
  description: '',
  website: '',
  contactPhone: '',
  contactEmail: '',
}

const inputClass = (hasError) =>
  `w-full rounded-2xl border bg-stone-50 px-4 py-3 text-sm font-bold text-stone-900 outline-none transition-all placeholder:text-stone-300 focus:ring-4 dark:bg-white/5 dark:text-white dark:placeholder:text-white/25 ${
    hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
      : 'border-stone-100 focus:border-amber-300 focus:ring-amber-500/10 dark:border-white/10 dark:focus:border-amber-500/50'
  }`

function FieldLabel({ icon: Icon, children }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
      {Icon && <Icon size="14" />}
      {children}
    </span>
  )
}

function FieldError({ children }) {
  if (!children) return null

  return (
    <p className="text-[11px] font-bold text-red-500 dark:text-red-300" role="alert">
      {children}
    </p>
  )
}

function LocationChoiceButton({ active, children, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl border px-4 py-3 text-sm font-black transition-all focus:outline-none focus:ring-4 focus:ring-stone-900/10 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-white/10 ${
        active
          ? 'border-stone-900 bg-stone-900 text-white shadow-lg shadow-stone-900/15 dark:border-white dark:bg-white dark:text-stone-950'
          : 'border-stone-100 bg-stone-50 text-stone-600 hover:border-stone-200 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-300 dark:hover:border-white/20'
      }`}
    >
      {children}
    </button>
  )
}

export default function ShopCreationForm({ onCreated }) {
  const [form, setForm] = useState(initialForm)
  const [hours, setHours] = useState(createDefaultBusinessHours)
  const [socialEntries, setSocialEntries] = useState(createInitialSocialEntries)
  const [errors, setErrors] = useState({})
  const [locationMode, setLocationMode] = useState(null)
  const [isLocating, setIsLocating] = useState(false)
  const [locationMessage, setLocationMessage] = useState('')
  const geocodeRequestRef = useRef(0)
  const { createShop, isCreating, createError } = useCreateShop()

  const hasCoordinates = Boolean(form.latitude && form.longitude)

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: '' }))
    }
  }

  const setCoordinates = useCallback((latitude, longitude) => {
    setForm((current) => ({
      ...current,
      latitude: String(latitude),
      longitude: String(longitude),
    }))
    setErrors((current) => ({
      ...current,
      latitude: '',
      longitude: '',
      location: '',
    }))
  }, [])

  const captureGpsLocation = useCallback(async () => {
    setIsLocating(true)
    setLocationMessage('Requesting your current location...')
    setErrors((current) => ({ ...current, location: '' }))

    try {
      const { latitude, longitude } = await getCurrentPosition()
      setCoordinates(latitude, longitude)

      try {
        const { address } = await reverseGeocode(latitude, longitude)
        setForm((current) => ({ ...current, address }))
        setLocationMessage('Live location captured successfully.')
      } catch {
        setLocationMessage('Coordinates saved. You can refine the address below.')
      }
    } catch (error) {
      setLocationMessage('')
      setErrors((current) => ({
        ...current,
        location: error.message || 'Unable to get your current location.',
      }))
    } finally {
      setIsLocating(false)
    }
  }, [setCoordinates])

  useEffect(() => {
    if (locationMode === 'in_shop') {
      captureGpsLocation()
    }
  }, [captureGpsLocation, locationMode])

  const handleLocationModeChange = (mode) => {
    setLocationMode(mode)
    setLocationMessage('')
    setErrors((current) => ({ ...current, location: '', address: '' }))

    if (mode === 'not_in_shop') {
      setForm((current) => ({
        ...current,
        latitude: '',
        longitude: '',
      }))
    }
  }

  const resolveAddressCoordinates = async (addressValue = form.address) => {
    const requestId = ++geocodeRequestRef.current
    setIsLocating(true)
    setLocationMessage('Looking up your address...')
    setErrors((current) => ({ ...current, location: '', address: '' }))

    try {
      const result = await geocodeAddress(addressValue)
      if (requestId !== geocodeRequestRef.current) return false

      setCoordinates(result.latitude, result.longitude)
      setForm((current) => ({
        ...current,
        address: result.address || addressValue.trim(),
      }))
      setLocationMessage('Address and coordinates saved.')
      return true
    } catch (error) {
      if (requestId !== geocodeRequestRef.current) return false
      setLocationMessage('')
      setErrors((current) => ({
        ...current,
        location: error.message || 'Unable to geocode that address.',
      }))
      return false
    } finally {
      if (requestId === geocodeRequestRef.current) {
        setIsLocating(false)
      }
    }
  }

  const handleAddressChange = (address) => {
    setForm((current) => ({
      ...current,
      address,
      latitude: '',
      longitude: '',
    }))
    setLocationMessage('')
    if (errors.address || errors.location) {
      setErrors((current) => ({ ...current, address: '', location: '' }))
    }
  }

  const handleAddressSelect = (suggestion) => {
    setForm((current) => ({
      ...current,
      address: suggestion.address,
      latitude: String(suggestion.latitude),
      longitude: String(suggestion.longitude),
    }))
    setLocationMessage('Address and coordinates saved.')
    setErrors((current) => ({ ...current, address: '', location: '' }))
  }

  const handleToggleDay = (dayId) => {
    setHours((current) => ({
      ...current,
      [dayId]: {
        ...current[dayId],
        isOpen: !current[dayId].isOpen,
      },
    }))
    if (errors.hours) {
      setErrors((current) => ({ ...current, hours: '' }))
    }
  }

  const handleUpdateDay = (dayId, field, value) => {
    setHours((current) => ({
      ...current,
      [dayId]: {
        ...current[dayId],
        [field]: value,
      },
    }))
    if (errors.hours) {
      setErrors((current) => ({ ...current, hours: '' }))
    }
  }

  const handleSocialChange = (entryId, nextEntry) => {
    setSocialEntries((current) =>
      current.map((entry) => (entry.id === entryId ? nextEntry : entry))
    )
    if (errors.social) {
      setErrors((current) => ({ ...current, social: '' }))
    }
  }

  const handleAddSocial = () => {
    const used = new Set(socialEntries.map((entry) => entry.platform).filter(Boolean))
    const nextPlatform = SOCIAL_PLATFORMS.find((platform) => !used.has(platform.value))?.value
    setSocialEntries((current) => [...current, createSocialEntry(nextPlatform || '', '')])
  }

  const handleRemoveSocial = (entryId) => {
    setSocialEntries((current) => current.filter((entry) => entry.id !== entryId))
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Shop name is required.'
    }

    if (!locationMode) {
      nextErrors.location = 'Tell us whether you are currently in your shop.'
    }

    if (!form.contactPhone.trim()) {
      nextErrors.contactPhone = 'Phone number is required.'
    } else if (!/^[+\d][\d\s()-]{6,}$/.test(form.contactPhone.trim())) {
      nextErrors.contactPhone = 'Enter a valid phone number.'
    }

    if (!form.address.trim()) {
      nextErrors.address = 'Shop address is required.'
    }

    if (!form.latitude.trim() || !form.longitude.trim()) {
      nextErrors.location = nextErrors.location || 'Select an address suggestion or use live location.'
    } else if (
      Number.isNaN(Number(form.latitude)) ||
      Number.isNaN(Number(form.longitude))
    ) {
      nextErrors.location = 'Shop coordinates are invalid.'
    }

    const hoursError = validateBusinessHours(hours)
    if (hoursError) {
      nextErrors.hours = hoursError
    }

    if (form.contactEmail.trim() && !validateEmail(form.contactEmail.trim())) {
      nextErrors.contactEmail = 'Enter a valid email address.'
    }

    if (form.website.trim() && !/^https?:\/\/.+\..+/.test(form.website.trim())) {
      nextErrors.website = 'Enter a valid website URL.'
    }

    const activeSocialEntries = socialEntries.filter(
      (entry) => entry.platform || entry.value.trim()
    )
    const incompleteSocial = activeSocialEntries.some(
      (entry) => !entry.platform || !entry.value.trim()
    )
    if (incompleteSocial) {
      nextErrors.social = 'Each added social platform needs both a platform and a handle.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isCreating) return

    if (!hasCoordinates && form.address.trim()) {
      const resolved = await resolveAddressCoordinates(form.address)
      if (!resolved) return
    }

    if (!validate()) return

    const payload = buildShopPayload({
      ...form,
      hours,
      socialEntries,
    })

    try {
      const shop = await createShop(payload)
      if (shop) {
        onCreated(shop)
      }
    } catch {
      // Error messaging is owned by useCreateShop.
    }
  }

  const fieldsDisabled = isCreating || isLocating

  return (
    <motion.form
      key="shop-form"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      onSubmit={handleSubmit}
      className="flex min-h-0 flex-col"
    >
      <div className="space-y-8 pb-6">
        <div className="space-y-5 pr-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
              <Shop size="22" variant="Bold" />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-600 dark:text-amber-300">
                Shop setup
              </p>
              <h2 className="font-display text-2xl font-black tracking-tight text-stone-950 dark:text-white">
                Create your first shop
              </h2>
            </div>
          </div>
          <p className="text-sm font-medium leading-7 text-stone-500 dark:text-stone-400">
            Tell us about your business, hours, and how customers can find you.
          </p>
        </div>

        <ProgressIndicator step={2} total={2} />

        <FormSection title="Basics">
          <label className="block space-y-2">
            <FieldLabel icon={Shop}>Shop Name</FieldLabel>
            <input
              value={form.name}
              onChange={updateField('name')}
              autoFocus
              autoComplete="organization"
              disabled={fieldsDisabled}
              placeholder="Eat Up Kitchen"
              className={inputClass(errors.name)}
            />
            <FieldError>{errors.name}</FieldError>
          </label>

          <label className="block space-y-2">
            <FieldLabel icon={DocumentText}>Description</FieldLabel>
            <textarea
              value={form.description}
              onChange={updateField('description')}
              disabled={fieldsDisabled}
              rows={3}
              placeholder="Fast casual Nigerian meals."
              className="w-full resize-none rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition-all placeholder:text-stone-300 focus:border-amber-300 focus:ring-4 focus:ring-amber-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/25 dark:focus:border-amber-500/50"
            />
          </label>
        </FormSection>

        <FormSection
          title="Location"
          description="Use live GPS if you are in your shop, or search for your address to save coordinates automatically."
        >
          <div className="space-y-3">
            <FieldLabel icon={Gps}>Are you currently in your shop?</FieldLabel>
            <div className="grid grid-cols-2 gap-3">
              <LocationChoiceButton
                active={locationMode === 'in_shop'}
                onClick={() => handleLocationModeChange('in_shop')}
                disabled={fieldsDisabled}
              >
                Yes
              </LocationChoiceButton>
              <LocationChoiceButton
                active={locationMode === 'not_in_shop'}
                onClick={() => handleLocationModeChange('not_in_shop')}
                disabled={fieldsDisabled}
              >
                No
              </LocationChoiceButton>
            </div>
            <FieldError>{errors.location}</FieldError>
          </div>

          {locationMode === 'in_shop' && (
            <div className="rounded-2xl border border-stone-100 bg-stone-50 px-4 py-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start gap-3">
                {isLocating ? (
                  <span className="mt-0.5 h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900 dark:border-white/20 dark:border-t-white" />
                ) : (
                  <Gps size="18" className="mt-0.5 shrink-0 text-stone-500 dark:text-stone-300" />
                )}
                <div className="space-y-1">
                  <p className="text-sm font-bold text-stone-800 dark:text-white">
                    {isLocating ? 'Capturing live location...' : 'Using your current GPS location'}
                  </p>
                  {hasCoordinates && (
                    <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                      {Number(form.latitude).toFixed(5)}, {Number(form.longitude).toFixed(5)}
                    </p>
                  )}
                  {locationMessage && (
                    <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-300">
                      {locationMessage}
                    </p>
                  )}
                </div>
              </div>
              {!isLocating && (
                <button
                  type="button"
                  onClick={captureGpsLocation}
                  className="mt-3 text-[11px] font-black uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                >
                  Refresh location
                </button>
              )}
            </div>
          )}

          {locationMode && (
            <div className="space-y-2">
              <FieldLabel icon={Location}>Shop Address</FieldLabel>
              {locationMode === 'not_in_shop' ? (
                <AddressAutocomplete
                  value={form.address}
                  onChange={handleAddressChange}
                  onSelect={handleAddressSelect}
                  error={errors.address}
                  disabled={fieldsDisabled}
                />
              ) : (
                <>
                  <input
                    value={form.address}
                    onChange={updateField('address')}
                    disabled={fieldsDisabled}
                    autoComplete="street-address"
                    placeholder="12 Allen Avenue, Ikeja, Lagos"
                    className={inputClass(errors.address)}
                  />
                  <FieldError>{errors.address}</FieldError>
                </>
              )}
            </div>
          )}
        </FormSection>

        <FormSection
          title="Business Hours"
          description="Only open days are sent to the backend."
        >
          <BusinessHoursSection
            hours={hours}
            onToggleDay={handleToggleDay}
            onUpdateDay={handleUpdateDay}
            error={errors.hours}
            disabled={fieldsDisabled}
          />
        </FormSection>

        <FormSection
          title="Social Media"
          description="Add the platforms where customers can follow your shop."
        >
          <SocialMediaSection
            entries={socialEntries}
            onChange={handleSocialChange}
            onAdd={handleAddSocial}
            onRemove={handleRemoveSocial}
            error={errors.social}
            disabled={fieldsDisabled}
          />
        </FormSection>

        <FormSection title="Contact">
          <label className="block space-y-2">
            <FieldLabel icon={Global}>Website</FieldLabel>
            <input
              value={form.website}
              onChange={updateField('website')}
              disabled={fieldsDisabled}
              autoComplete="url"
              placeholder="https://eatup.example.com"
              className={inputClass(errors.website)}
            />
            <FieldError>{errors.website}</FieldError>
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <FieldLabel icon={Call}>Phone</FieldLabel>
              <input
                value={form.contactPhone}
                onChange={updateField('contactPhone')}
                disabled={fieldsDisabled}
                autoComplete="tel"
                inputMode="tel"
                placeholder="08031234567"
                className={inputClass(errors.contactPhone)}
              />
              <FieldError>{errors.contactPhone}</FieldError>
            </label>

            <label className="block space-y-2">
              <FieldLabel icon={Sms}>Email</FieldLabel>
              <input
                value={form.contactEmail}
                onChange={updateField('contactEmail')}
                disabled={fieldsDisabled}
                type="email"
                autoComplete="email"
                placeholder="shop@example.com"
                className={inputClass(errors.contactEmail)}
              />
              <FieldError>{errors.contactEmail}</FieldError>
            </label>
          </div>
        </FormSection>
      </div>

      <div className="sticky bottom-0 -mx-6 border-t border-stone-100 bg-white/95 px-6 py-4 backdrop-blur-sm dark:border-white/10 dark:bg-[#1a1c1e]/95 sm:-mx-8 sm:px-8">
        {createError && (
          <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
            {createError}
          </div>
        )}

        <button
          type="submit"
          disabled={isCreating}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-950 px-5 py-4 text-sm font-black text-white shadow-xl shadow-stone-950/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-amber-500/20 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-100"
        >
          {isCreating && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-stone-950/20 dark:border-t-stone-950" />
          )}
          {isCreating ? 'Creating Shop...' : 'Create Shop'}
        </button>
      </div>
    </motion.form>
  )
}
