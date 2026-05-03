import { useState } from "react"
import { CircleMarker, Polyline, Popup, useMap, useMapEvents } from "react-leaflet"
import type { LocationEntry } from "../data/location/types"

/** Render the selected day's effective track on the map. */
export function LocationTrackLayer({ locations, samplePointZoomThreshold = 15 }: Props) {
  const map = useMap()
  const [zoom, setZoom] = useState(map.getZoom())

  useMapEvents({
    zoomend: () => {
      setZoom(map.getZoom())
    },
  })

  return (
    <>
      <Polyline
        positions={locations.map(location => [location.latitude, location.longitude])}
        pathOptions={{ className: "location-track-line" }}
      />
      {locations.length === 0 ? null : (
        <>
          <CircleMarker
            center={[locations[0].latitude, locations[0].longitude]}
            radius={8}
            pathOptions={{ className: "location-track-start" }}
          >
            <Popup>
              <div>Start</div>
              <div>{locations[0].timestamp}</div>
            </Popup>
          </CircleMarker>
          <CircleMarker
            center={[
              locations[locations.length - 1].latitude,
              locations[locations.length - 1].longitude,
            ]}
            radius={8}
            pathOptions={{ className: "location-track-end" }}
          >
            <Popup>
              <div>End</div>
              <div>{locations[locations.length - 1].timestamp}</div>
            </Popup>
          </CircleMarker>
        </>
      )}
      {zoom < samplePointZoomThreshold ? null : (
        locations.map(location => {
          return (
            <CircleMarker
              key={`${location.timestamp}-${location.latitude}-${location.longitude}`}
              center={[location.latitude, location.longitude]}
              radius={5}
              pathOptions={{ className: "location-track-point" }}
            >
              <Popup>{location.timestamp}</Popup>
            </CircleMarker>
          )
        })
      )}
    </>
  )
}

type Props = {
  /** The effective day track to render. */
  locations: LocationEntry[]
  /** The minimum zoom level that reveals individual sample points. */
  samplePointZoomThreshold?: number
}
