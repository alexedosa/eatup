// Simple mock auth store
// Replace with Zustand or context when connecting to backend

let currentUser = null;

export const mockUsers = {
  vendor: { email: "vendor@eatup.ng", name: "Mama Titi", role: "vendor" },
};

export function getUser() {
  return currentUser;
}

export function setUser(user) {
  currentUser = user;
}

export function clearUser() {
  currentUser = null;
}
