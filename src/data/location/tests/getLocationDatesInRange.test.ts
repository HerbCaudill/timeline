import { describe, expect, it } from "vitest"
import { getLocationDatesInRange } from "../getLocationDatesInRange"

describe("getLocationDatesInRange", () => {
  it("returns every calendar day in an inclusive range", () => {
    expect(
      getLocationDatesInRange({
        endDate: "2024-01-03",
        startDate: "2024-01-01",
      }),
    ).toEqual(["2024-01-01", "2024-01-02", "2024-01-03"])
  })
})
