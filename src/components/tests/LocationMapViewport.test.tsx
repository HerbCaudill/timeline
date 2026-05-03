import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

const fitBounds = vi.fn()

vi.mock("react-leaflet", () => {
  return {
    useMap: () => {
      return {
        fitBounds,
      }
    },
  }
})

import { LocationMapViewport } from "../LocationMapViewport"
import type { LocationEntry } from "../../data/location/types"

describe("LocationMapViewport", () => {
  it("refits the map to the selected day's track when locations change", () => {
    const { rerender } = render(
      <LocationMapViewport locations={[createLocationEntry("2024-01-01T08:00:00", 1, 2)]} />,
    )

    expect(fitBounds).toHaveBeenCalledWith([[1, 2]], { padding: [24, 24] })

    rerender(
      <LocationMapViewport
        locations={[
          createLocationEntry("2024-01-02T08:00:00", 3, 4),
          createLocationEntry("2024-01-02T09:00:00", 5, 6),
        ]}
      />,
    )

    expect(fitBounds).toHaveBeenLastCalledWith(
      [
        [3, 4],
        [5, 6],
      ],
      { padding: [24, 24] },
    )
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
