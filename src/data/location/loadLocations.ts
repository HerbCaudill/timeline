import { parseLocationCsv } from "./parseLocationCsv"
import type { FetchLocationData, LocationEntry } from "./types"

/** Load the location CSV file and parse it into memory. */
export async function loadLocations(
  /** A fetch-compatible function used to request the CSV file. */
  fetchLocationData: FetchLocationData = fetch,
): Promise<LocationEntry[]> {
  const response = await fetchLocationData("/data/locations.csv")
  const csv = await response.text()

  return parseLocationCsv(csv)
}
