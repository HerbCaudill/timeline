import type { LocationEntry } from "./types"

/** Parse the backtrack CSV export into location entries. */
export function parseBacktrackCsv(
  /** The raw CSV file contents. */
  csv: string,
): LocationEntry[] {
  return csv
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .filter(Boolean)
    .map(line => {
      const [dateTime, latitude, longitude, device] = line.split(",")

      return {
        date: dateTime.slice(0, 10),
        device,
        latitude: Number(latitude),
        longitude: Number(longitude),
        timestamp: dateTime.replace(" ", "T"),
      }
    })
}
