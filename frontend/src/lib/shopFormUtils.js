import { DAYS } from '@/lib/profileUtils'

export const TIME_OPTIONS = Array.from({ length: 48 }, (_, index) => {
  const hours = String(Math.floor(index / 2)).padStart(2, '0')
  const minutes = index % 2 === 0 ? '00' : '30'
  return `${hours}:${minutes}`
})

export function createDefaultBusinessHours() {
  return DAYS.reduce((acc, day) => {
    const isWeekday = day.id === 'monday' || day.id === 'tuesday'
    acc[day.id] = {
      isOpen: isWeekday,
      open: '09:00',
      close: '21:00',
    }
    return acc
  }, {})
}

export function buildOpeningHoursPayload(hours) {
  return DAYS.reduce((acc, day) => {
    const schedule = hours[day.id]
    if (schedule?.isOpen) {
      acc[day.id] = `${schedule.open}-${schedule.close}`
    }
    return acc
  }, {})
}

export function parseOpeningHoursFromApi(openingHours = {}) {
  return DAYS.reduce((acc, day) => {
    const value = openingHours[day.id]

    if (value) {
      const [open, close] = value.split('-')
      acc[day.id] = {
        open: open || '09:00',
        close: close || '21:00',
        isOpen: true,
      }
    } else {
      acc[day.id] = {
        open: '09:00',
        close: '21:00',
        isOpen: false,
      }
    }

    return acc
  }, {})
}

export function buildSocialMediaPayload(entries) {
  return entries.reduce((acc, entry) => {
    const value = entry.value?.trim()
    if (entry.platform && value) {
      acc[entry.platform] = value
    }
    return acc
  }, {})
}

export function validateBusinessHours(hours) {
  const openDays = DAYS.filter((day) => hours[day.id]?.isOpen)

  if (openDays.length === 0) {
    return 'Select at least one open business day.'
  }

  for (const day of openDays) {
    const schedule = hours[day.id]
    if (!schedule.open || !schedule.close) {
      return `${day.label} needs opening and closing times.`
    }
    if (schedule.open >= schedule.close) {
      return `${day.label} closing time must be after opening time.`
    }
  }

  return ''
}

export function buildShopPayload({
  name,
  address,
  latitude,
  longitude,
  description,
  hours,
  socialEntries,
  website,
  contactPhone,
  contactEmail,
}) {
  return {
    name: name.trim(),
    address: address.trim(),
    latitude: Number(latitude),
    longitude: Number(longitude),
    description: description.trim(),
    openingHours: buildOpeningHoursPayload(hours),
    socialMediaHandles: buildSocialMediaPayload(socialEntries),
    website: website.trim(),
    contactPhone: contactPhone.trim(),
    contactEmail: contactEmail.trim(),
  }
}
