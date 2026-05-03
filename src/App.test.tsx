import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
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

  it("renders date scrubber controls for the continuous timeline range", async () => {
    render(<App />)

    expect(await screen.findByText("2024-01-01")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Previous day" })).toBeDisabled()

    fireEvent.click(screen.getByRole("button", { name: "Next day" }))

    expect(screen.getByText("2024-01-02")).toBeInTheDocument()
  })
})
