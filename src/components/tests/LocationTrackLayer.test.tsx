import { render, screen } from "@testing-library/react"
import type { ReactNode } from "react"
import { describe, expect, it, vi } from "vitest"

const zoomState = { current: 15 }

vi.mock("react-leaflet", () => {
  return {
    CircleMarker: ({ children }: { children?: ReactNode }) => {
      return <div data-testid="circle-marker">{children}</div>
    },
    Polyline: ({ positions }: { positions: Array<[number, number]> }) => {
      return <div data-testid="polyline">{JSON.stringify(positions)}</div>
    },
    Popup: ({ children }: { children?: ReactNode }) => {
      return <div>{children}</div>
    },
    useMap: () => {
      return {
        getZoom: () => zoomState.current,
      }
    },
    useMapEvents: () => {
      return null
    },
  }
})

import { LocationTrackLayer } from "../LocationTrackLayer"
import type { LocationEntry } from "../../data/location/types"

describe("LocationTrackLayer", () => {
  it("renders a straight-line polyline with start and end markers", () => {
    render(<LocationTrackLayer locations={createTrack()} />)

    expect(screen.getByTestId("polyline")).toHaveTextContent("[[1,2],[3,4],[5,6]]")
    expect(screen.getAllByTestId("circle-marker")).toHaveLength(5)
    expect(screen.getByText("Start")).toBeInTheDocument()
    expect(screen.getByText("End")).toBeInTheDocument()
  })

  it("hides sample point markers below the zoom threshold", () => {
    zoomState.current = 13

    render(<LocationTrackLayer locations={createTrack()} />)

    expect(screen.getAllByTestId("circle-marker")).toHaveLength(2)
  })
})

/** Create a sample effective track for tests. */
function createTrack(): LocationEntry[] {
  return [
    createLocationEntry("2024-01-01T08:00:00", 1, 2),
    createLocationEntry("2024-01-01T09:00:00", 3, 4),
    createLocationEntry("2024-01-01T10:00:00", 5, 6),
  ]
}

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
