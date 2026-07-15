/**
 * Free location helpers for vendor shop setup.
 * - GPS: browser Geolocation API
 * - Autocomplete: Photon (OpenStreetMap)
 * - Forward geocode: Open-Meteo Geocoding API (no key)
 * - Reverse geocode: BigDataCloud client API (no key)
 */

export function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation is not supported on this device.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        const messages = {
          1: 'Location permission was denied. Allow access or enter your address manually.',
          2: 'Your location is unavailable right now. Try again or enter your address manually.',
          3: 'Location request timed out. Try again or enter your address manually.',
        }
        reject(new Error(messages[error.code] || 'Unable to get your current location.'))
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
        ...options,
      }
    )
  })
}

export async function searchAddressSuggestions(query, limit = 5) {
  const trimmed = query.trim()
  if (trimmed.length < 3) return []

  const url = new URL('https://photon.komoot.io/api/')
  url.searchParams.set('q', trimmed)
  url.searchParams.set('limit', String(limit))
  url.searchParams.set('lang', 'en')

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('Unable to load address suggestions.')
  }

  const data = await response.json()

  return (data.features || []).map((feature, index) => {
    const [longitude, latitude] = feature.geometry.coordinates
    const props = feature.properties || {}
    const address = formatPhotonAddress(props)

    return {
      id: `${latitude}-${longitude}-${index}`,
      label: address,
      address,
      latitude,
      longitude,
    }
  })
}

export async function geocodeAddress(address) {
  const query = address.trim()
  if (!query) {
    throw new Error('Enter a shop address to continue.')
  }

  const suggestions = await searchAddressSuggestions(query, 1)
  if (suggestions.length > 0) {
    const match = suggestions[0]
    return {
      latitude: match.latitude,
      longitude: match.longitude,
      address: match.address,
    }
  }

  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  url.searchParams.set('name', query)
  url.searchParams.set('count', '1')
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('Unable to look up that address. Please try again.')
  }

  const data = await response.json()
  const match = data?.results?.[0]

  if (!match) {
    throw new Error('We could not find that address. Try adding city and state.')
  }

  return {
    latitude: match.latitude,
    longitude: match.longitude,
    address: formatOpenMeteoResult(match),
  }
}

export async function reverseGeocode(latitude, longitude) {
  const url = new URL('https://api.bigdatacloud.net/data/reverse-geocode-client')
  url.searchParams.set('latitude', String(latitude))
  url.searchParams.set('longitude', String(longitude))
  url.searchParams.set('localityLanguage', 'en')

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('Location captured, but we could not resolve the address.')
  }

  const data = await response.json()
  const address =
    data.localityInfo?.informative?.find((item) => item.description)?.description ||
    [data.locality, data.city, data.principalSubdivision, data.countryName]
      .filter(Boolean)
      .join(', ')

  if (!address) {
    throw new Error('Location captured, but we could not resolve the address.')
  }

  return { address }
}

function formatPhotonAddress(props) {
  const primary = [props.housenumber, props.street, props.name].filter(Boolean).join(' ')
  const locality = [props.city || props.locality, props.state, props.country]
    .filter(Boolean)
    .join(', ')

  return [primary, locality].filter(Boolean).join(', ') || props.name || ''
}

function formatOpenMeteoResult(result) {
  const parts = [result.name, result.admin1, result.country].filter(Boolean)
  return parts.join(', ')
}
