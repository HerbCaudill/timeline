import type { LocationDateRange } from "./types"

/** Return every calendar day inside an inclusive location date range. */
export function getLocationDatesInRange(
  /** The inclusive date range to expand into individual days. */
  dateRange: LocationDateRange,
): string[] {
  const dates: string[] = []

  for (
    let timestamp = Date.parse(`${dateRange.startDate}T00:00:00.000Z`);
    timestamp <= Date.parse(`${dateRange.endDate}T00:00:00.000Z`);
    timestamp += 24 * 60 * 60 * 1000
  ) {
    dates.push(new Date(timestamp).toISOString().slice(0, 10))
  }

  return dates
}
