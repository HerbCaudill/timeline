import type { BoundingBox, LocationEntry } from "./types"

/** Return the location entries inside an inclusive bounding box. */
export function getLocationsInBoundingBox(
  /** The full in-memory location dataset. */
  locations: LocationEntry[],
  /** The geographic bounds to query. */
  boundingBox: BoundingBox,
): LocationEntry[] {
  return locations.filter(
    location =>
      location.latitude >= boundingBox.minLatitude &&
      location.latitude <= boundingBox.maxLatitude &&
      location.longitude >= boundingBox.minLongitude &&
      location.longitude <= boundingBox.maxLongitude,
  )
}
