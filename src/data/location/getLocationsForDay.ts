import type { LocationEntry } from "./types"

/** Return the location entries for a single calendar day. */
export function getLocationsForDay(
  /** The full in-memory location dataset. */
  locations: LocationEntry[],
  /** The yyyy-mm-dd day to query. */
  day: string,
): LocationEntry[] {
  return locations.filter(location => location.date === day)
}
