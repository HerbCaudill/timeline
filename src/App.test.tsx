import { fireEvent, render, screen } from "@testing-library/react"
import type { ReactNode } from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("./components/LocationMapShell", () => {
  return {
    LocationMapShell: ({ children, footer }: { children?: ReactNode; footer: ReactNode }) => {
      return (
        <div role="region" aria-label="Location map">
          <div>{children}</div>
          {footer}
        </div>
      )
    },
  }
})

vi.mock("./components/LocationTrackLayer", () => {
  return {
    LocationTrackLayer: ({ locations }: { locations: Array<{ timestamp: string }> }) => {
      return <div>Track: {locations.map(location => location.timestamp).join(", ")}</div>
    },
  }
})

import { App } from "./App"

describe("App", () => {
  beforeEach(() => {
    const csv = [
      "DateTime,Latitude,Longitude,Device",
      "2024-01-01 08:00:00,1,1,iPhone",
      "2024-01-03 10:00:00,2,2,iPhone",
    ].join("\n")

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        return new Response(csv)
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("renders the map shell with date scrubber controls for the continuous timeline range", async () => {
    render(<App />)

    expect(await screen.findByRole("region", { name: "Location map" })).toBeInTheDocument()
    expect(screen.getByText("2024-01-01")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Previous day" })).toBeDisabled()

    fireEvent.click(screen.getByRole("button", { name: "Next day" }))

    expect(screen.getByText("2024-01-02")).toBeInTheDocument()
  })

  it("renders the selected day's effective track inside the map shell", async () => {
    render(<App />)

    expect(await screen.findByText("Track: 2024-01-01T08:00:00")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Next day" }))
    expect(screen.getByText("Track: 2024-01-01T08:00:00")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Next day" }))
    expect(screen.getByText("Track: 2024-01-01T08:00:00, 2024-01-03T10:00:00")).toBeInTheDocument()
  })
})
