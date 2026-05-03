import { describe, expect, it } from "vitest"
import { parseLocationCsv } from "../parseLocationCsv"

describe("parseLocationCsv", () => {
  it("parses location csv rows into location entries", () => {
    const csv = [
      "DateTime,Latitude,Longitude,Device",
      "2026-02-25 11:28:17,41.919851,3.207774,iPhone",
      "2026-02-26 15:58:18,41.919871,3.207733,iPad",
    ].join("\n")

    expect(parseLocationCsv(csv)).toEqual([
      {
        date: "2026-02-25",
        device: "iPhone",
        latitude: 41.919851,
        longitude: 3.207774,
        timestamp: "2026-02-25T11:28:17",
      },
      {
        date: "2026-02-26",
        device: "iPad",
        latitude: 41.919871,
        longitude: 3.207733,
        timestamp: "2026-02-26T15:58:18",
      },
    ])
  })
})
