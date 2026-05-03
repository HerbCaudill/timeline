import { describe, expect, it } from "vitest"
import { getLocationsInBoundingBox } from "../getLocationsInBoundingBox"
import type { LocationEntry } from "../types"

describe("getLocationsInBoundingBox", () => {
  it("returns only entries inside the inclusive bounding box", () => {
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
        latitude: 41.95,
        longitude: 3.25,
        timestamp: "2026-02-26T15:58:18",
      },
      {
        date: "2026-02-26",
        device: "iPhone",
        latitude: 42,
        longitude: 3.3,
        timestamp: "2026-02-26T16:00:00",
      },
    ]

    expect(
      getLocationsInBoundingBox(locations, {
        maxLatitude: 41.95,
        maxLongitude: 3.25,
        minLatitude: 41.919851,
        minLongitude: 3.207774,
      }),
    ).toEqual([locations[0], locations[1]])
  })
})
