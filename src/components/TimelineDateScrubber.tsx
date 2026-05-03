/** Render day-by-day timeline navigation controls. */
export function TimelineDateScrubber({ dates, selectedDate, onSelectedDateChange }: Props) {
  const selectedIndex = Math.max(dates.indexOf(selectedDate), 0)

  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-xl bg-white/90 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          disabled={selectedIndex === 0}
          onClick={() => onSelectedDateChange(dates[selectedIndex - 1])}
        >
          Previous day
        </button>
        <span className="text-sm font-medium">{selectedDate}</span>
        <button
          type="button"
          className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          disabled={selectedIndex === dates.length - 1}
          onClick={() => onSelectedDateChange(dates[selectedIndex + 1])}
        >
          Next day
        </button>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        <span>Timeline date</span>
        <input
          type="range"
          min={0}
          max={Math.max(dates.length - 1, 0)}
          step={1}
          value={selectedIndex}
          onChange={event => onSelectedDateChange(dates[Number(event.currentTarget.value)])}
        />
      </label>
    </div>
  )
}

type Props = {
  /** The continuous set of available timeline dates. */
  dates: string[]
  /** The currently selected date. */
  selectedDate: string
  /** Called when the selected date changes. */
  onSelectedDateChange: (selectedDate: string) => void
}
