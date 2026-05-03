import { describe, expect, it } from "vitest"
import { getLocationsForDay } from "../getLocationsForDay"
import type { LocationEntry } from "../types"

describe("getLocationsForDay", () => {
  it("returns only entries for the requested day", () => {
    const locations: LocationEntry[] = [
      {
        date: "2026-02-25",
        device: "iPhone",
        latitude: 41.919851,
        longitude: 3.207774,
        timestamp: "2026-02-25T11:28:17",
      },
      {
        date: "2026-02-26",
        device: "iPhone",
        latitude: 41.919871,
        longitude: 3.207733,
        timestamp: "2026-02-26T15:58:18",
      },
    ]

    expect(getLocationsForDay(locations, "2026-02-26")).toEqual([locations[1]])
  })
})
