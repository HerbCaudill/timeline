import { useEffect, useState } from "react"
import { LocationMapShell } from "./components/LocationMapShell"
import { TimelineDateScrubber } from "./components/TimelineDateScrubber"
import { getLocationDateRange } from "./data/location/getLocationDateRange"
import { getLocationDatesInRange } from "./data/location/getLocationDatesInRange"
import { loadLocations } from "./data/location/loadLocations"

/** Render the app shell. */
export function App({}: Props) {
  const [dates, setDates] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null)

  useEffect(() => {
    void loadLocations().then(locations => {
      const dateRange = getLocationDateRange(locations)

      if (dateRange === null) {
        return
      }

      const nextDates = getLocationDatesInRange(dateRange)
      setDates(nextDates)
      setSelectedDate(nextDates[0] ?? null)
      setMapCenter([locations[0].latitude, locations[0].longitude])
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
    />
  )
}

type Props = {}
