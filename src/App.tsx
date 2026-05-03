import { useEffect, useState } from "react"
import { LocationMapShell } from "./components/LocationMapShell"
import { LocationTrackLayer } from "./components/LocationTrackLayer"
import { TimelineDateScrubber } from "./components/TimelineDateScrubber"
import { getEffectiveLocationsForDay } from "./data/location/getEffectiveLocationsForDay"
import { getLocationDateRange } from "./data/location/getLocationDateRange"
import { getLocationDatesInRange } from "./data/location/getLocationDatesInRange"
import { loadLocations } from "./data/location/loadLocations"
import type { LocationEntry } from "./data/location/types"

/** Render the app shell. */
export function App({}: Props) {
  const [dates, setDates] = useState<string[]>([])
  const [locations, setLocations] = useState<LocationEntry[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null)

  useEffect(() => {
    void loadLocations().then(nextLocations => {
      const dateRange = getLocationDateRange(nextLocations)

      if (dateRange === null) {
        return
      }

      const nextDates = getLocationDatesInRange(dateRange)
      setDates(nextDates)
      setLocations(nextLocations)
      setSelectedDate(nextDates[0] ?? null)
      setMapCenter([nextLocations[0].latitude, nextLocations[0].longitude])
    })
  }, [])

  if (selectedDate === null || mapCenter === null) {
    return <div className="min-h-screen bg-slate-100" />
  }

  return (
    <LocationMapShell
      center={mapCenter}
      footer={
        <TimelineDateScrubber
          dates={dates}
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
        />
      }
    >
      <LocationTrackLayer locations={getEffectiveLocationsForDay(locations, selectedDate)} />
    </LocationMapShell>
  )
}

type Props = {}
