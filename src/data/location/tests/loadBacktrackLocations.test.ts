import { describe, expect, it } from "vitest"
import { loadBacktrackLocations } from "../loadBacktrackLocations"

describe("loadBacktrackLocations", () => {
  it("loads and parses the backtrack csv file into memory", async () => {
    const csv = [
      "DateTime,Latitude,Longitude,Device",
      "2026-02-25 11:28:17,41.919851,3.207774,iPhone",
    ].join("\n")

    const locations = await loadBacktrackLocations(async () => {
      return new Response(csv)
    })

    expect(locations).toEqual([
      {
        date: "2026-02-25",
        device: "iPhone",
        latitude: 41.919851,
        longitude: 3.207774,
        timestamp: "2026-02-25T11:28:17",
      },
    ])
  })
})
