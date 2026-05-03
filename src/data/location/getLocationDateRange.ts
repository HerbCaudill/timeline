import type { LocationDateRange, LocationEntry } from "./types"

/** Return the inclusive date range covered by the dataset. */
export function getLocationDateRange(
  /** The full in-memory location dataset. */
  locations: LocationEntry[],
): LocationDateRange | null {
  if (locations.length === 0) {
    return null
  }

  const dates = locations.map(location => location.date).sort()

  return {
    endDate: dates[dates.length - 1],
    startDate: dates[0],
  }
}
