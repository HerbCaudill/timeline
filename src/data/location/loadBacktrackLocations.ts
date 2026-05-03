import { parseBacktrackCsv } from "./parseBacktrackCsv"
import type { FetchLocationData, LocationEntry } from "./types"

/** Load the backtrack CSV file and parse it into memory. */
export async function loadBacktrackLocations(
  /** A fetch-compatible function used to request the CSV file. */
  fetchLocationData: FetchLocationData = fetch,
): Promise<LocationEntry[]> {
  const response = await fetchLocationData("/data/backtrack.csv")
  const csv = await response.text()

  return parseBacktrackCsv(csv)
}
