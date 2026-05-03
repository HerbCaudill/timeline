import { getLocationDateRange } from "./getLocationDateRange"
import { getLocationsForDay } from "./getLocationsForDay"
import type { LocationEntry } from "./types"

/** Return the selected day's effective location track with carry-forward behavior. */
export function getEffectiveLocationsForDay(
  /** The full in-memory location dataset. */
  locations: LocationEntry[],
  /** The yyyy-mm-dd day to query. */
  day: string,
): LocationEntry[] {
  const dateRange = getLocationDateRange(locations)

  if (dateRange === null || day < dateRange.startDate || day > dateRange.endDate) {
    return []
  }

  const sortedLocations = [...locations].sort((left, right) =>
    left.timestamp.localeCompare(right.timestamp),
  )
  const dayLocations = getLocationsForDay(sortedLocations, day)

  if (day === dateRange.startDate) {
    return dayLocations
  }

  const previousLocation = [...sortedLocations].reverse().find(location => location.date < day)

  if (dayLocations.length === 0) {
    return previousLocation === undefined ? [] : [previousLocation]
  }

  return previousLocation === undefined ? dayLocations : [previousLocation, ...dayLocations]
}
