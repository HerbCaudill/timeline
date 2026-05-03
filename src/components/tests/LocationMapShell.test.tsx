import { render, screen } from "@testing-library/react"
import type { ReactNode } from "react"
import { describe, expect, it, vi } from "vitest"

vi.mock("react-leaflet", () => {
  return {
    MapContainer: ({ children }: { children: ReactNode }) => {
      return <div data-testid="map-container">{children}</div>
    },
    TileLayer: ({ url }: { url: string }) => {
      return <div>{url}</div>
    },
  }
})

import { LocationMapShell } from "../LocationMapShell"

describe("LocationMapShell", () => {
  it("renders a map region with an OpenStreetMap tile layer and footer content", () => {
    render(
      <LocationMapShell footer={<div>Footer content</div>}>
        <div>Track content</div>
      </LocationMapShell>,
    )

    expect(screen.getByRole("region", { name: "Location map" })).toBeInTheDocument()
    expect(
      screen.getByText("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    ).toBeInTheDocument()
    expect(screen.getByText("Track content")).toBeInTheDocument()
    expect(screen.getByText("Footer content")).toBeInTheDocument()
  })
})
