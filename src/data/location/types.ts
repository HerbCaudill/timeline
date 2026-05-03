/** A single location sample from the location export. */
export type LocationEntry = {
  /** The calendar day in local yyyy-mm-dd format. */
  date: string
  /** The device label from the export. */
  device: string
  /** The recorded latitude. */
  latitude: number
  /** The recorded longitude. */
  longitude: number
  /** The local timestamp in ISO-like yyyy-mm-ddThh:mm:ss format. */
  timestamp: string
}

/** An inclusive geographic bounding box. */
export type BoundingBox = {
  /** The southern latitude edge. */
  minLatitude: number
  /** The western longitude edge. */
  minLongitude: number
  /** The northern latitude edge. */
  maxLatitude: number
  /** The eastern longitude edge. */
  maxLongitude: number
}

/** An inclusive date range spanning the location dataset. */
export type LocationDateRange = {
  /** The first calendar day in the dataset. */
  startDate: string
  /** The last calendar day in the dataset. */
  endDate: string
}

/** A fetch-compatible function for loading location data. */
export type FetchLocationData = (
  /** The path to the CSV file. */
  input: string,
) => Promise<Response>
