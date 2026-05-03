import { useEffect } from "react"
import { useMap } from "react-leaflet"
import type { LocationEntry } from "../data/location/types"

/** Refit the map viewport to the current effective day track. */
export function LocationMapViewport({ locations }: Props) {
  const map = useMap()

  useEffect(() => {
    if (locations.length === 0) {
      return
    }

    map.fitBounds(
      locations.map(location => [location.latitude, location.longitude]),
      { padding: [24, 24] },
    )
  }, [locations, map])

  return null
}

type Props = {
  /** The effective day track that should be visible. */
  locations: LocationEntry[]
}
