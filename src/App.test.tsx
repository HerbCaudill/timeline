import { fireEvent, render, screen } from "@testing-library/react"
import type { ReactNode } from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("./components/LocationMapShell", () => {
  return {
    LocationMapShell: ({ footer }: { footer: ReactNode }) => {
      return (
        <div role="region" aria-label="Location map">
          {footer}
        </div>
      )
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
})
