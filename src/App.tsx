import { useEffect, useState } from "react"
import { TimelineDateScrubber } from "./components/TimelineDateScrubber"
import { getLocationDateRange } from "./data/location/getLocationDateRange"
import { getLocationDatesInRange } from "./data/location/getLocationDatesInRange"
import { loadLocations } from "./data/location/loadLocations"

/** Render the app shell. */
export function App({}: Props) {
  const [dates, setDates] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  useEffect(() => {
    void loadLocations().then(locations => {
      const dateRange = getLocationDateRange(locations)

      if (dateRange === null) {
        return
      }

      const nextDates = getLocationDatesInRange(dateRange)
      setDates(nextDates)
      setSelectedDate(nextDates[0] ?? null)
    })
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      {selectedDate === null ? null : (
        <TimelineDateScrubber
          dates={dates}
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
        />
      )}
    </div>
  )
}

type Props = {}
