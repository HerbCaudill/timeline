import { describe, expect, it } from "vitest"
import { getLocationDateRange } from "../getLocationDateRange"
import type { LocationEntry } from "../types"

describe("getLocationDateRange", () => {
  it("returns null when there are no locations", () => {
    expect(getLocationDateRange([])).toBeNull()
  })

  it("returns the earliest and latest calendar days in the dataset", () => {
    const locations: LocationEntry[] = [
      createLocationEntry("2024-01-03T08:00:00"),
      createLocationEntry("2024-01-01T12:00:00"),
      createLocationEntry("2024-01-02T09:30:00"),
      createLocationEntry("2024-01-03T18:45:00"),
    ]

    expect(getLocationDateRange(locations)).toEqual({
      endDate: "2024-01-03",
      startDate: "2024-01-01",
    })
  })
})

/** Create a location entry for tests. */
function createLocationEntry(
  /** The timestamp for the sample. */
  timestamp: string,
): LocationEntry {
  return {
    date: timestamp.slice(0, 10),
    device: "phone",
    latitude: 0,
    longitude: 0,
    timestamp,
  }
}
