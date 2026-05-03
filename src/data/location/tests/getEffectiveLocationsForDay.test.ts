import { describe, expect, it } from "vitest"
import { getEffectiveLocationsForDay } from "../getEffectiveLocationsForDay"
import type { LocationEntry } from "../types"

describe("getEffectiveLocationsForDay", () => {
  it("returns the first day's recorded samples without a carry-forward point", () => {
    const locations = [
      createLocationEntry("2024-01-01T08:00:00", 1, 1),
      createLocationEntry("2024-01-01T09:00:00", 2, 2),
      createLocationEntry("2024-01-03T10:00:00", 3, 3),
    ]

    expect(getEffectiveLocationsForDay(locations, "2024-01-01")).toEqual([
      locations[0],
      locations[1],
    ])
  })

  it("prepends the previous day's last known location when the selected day has samples", () => {
    const locations = [
      createLocationEntry("2024-01-01T08:00:00", 1, 1),
      createLocationEntry("2024-01-01T09:00:00", 2, 2),
      createLocationEntry("2024-01-03T10:00:00", 3, 3),
      createLocationEntry("2024-01-03T11:00:00", 4, 4),
    ]

    expect(getEffectiveLocationsForDay(locations, "2024-01-03")).toEqual([
      locations[1],
      locations[2],
      locations[3],
    ])
  })

  it("treats gap days as stationary at the last known location", () => {
    const locations = [
      createLocationEntry("2024-01-01T09:00:00", 2, 2),
      createLocationEntry("2024-01-03T10:00:00", 3, 3),
    ]

    expect(getEffectiveLocationsForDay(locations, "2024-01-02")).toEqual([locations[0]])
  })

  it("returns an empty track when the selected day is outside the dataset range", () => {
    const locations = [createLocationEntry("2024-01-01T09:00:00", 2, 2)]

    expect(getEffectiveLocationsForDay(locations, "2023-12-31")).toEqual([])
    expect(getEffectiveLocationsForDay(locations, "2024-01-02")).toEqual([])
  })
})

/** Create a location entry for tests. */
function createLocationEntry(
  /** The timestamp for the sample. */
  timestamp: string,
  /** The recorded latitude. */
  latitude: number,
  /** The recorded longitude. */
  longitude: number,
): LocationEntry {
  return {
    date: timestamp.slice(0, 10),
    device: "phone",
    latitude,
    longitude,
    timestamp,
  }
}
