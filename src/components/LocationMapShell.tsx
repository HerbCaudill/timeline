import type { ReactNode } from "react"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet"

/** Render the full-screen React Leaflet map shell with an overlay footer. */
export function LocationMapShell({ center, zoom = 13, children, footer }: Props) {
  return (
    <div className="relative min-h-screen w-full" role="region" aria-label="Location map">
      <MapContainer center={center} zoom={zoom} className="h-screen w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
        <div className="pointer-events-auto mx-auto max-w-md">{footer}</div>
      </div>
    </div>
  )
}

type Props = {
  /** The initial map center. */
  center: [number, number]
  /** The initial map zoom level. */
  zoom?: number
  /** Additional map content such as tracks or markers. */
  children?: ReactNode
  /** Overlay content rendered at the bottom of the map. */
  footer: ReactNode
}
