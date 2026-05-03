import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { TimelineDateScrubber } from "../TimelineDateScrubber"

describe("TimelineDateScrubber", () => {
  it("disables previous and next buttons at the ends of the range", () => {
    const dates = ["2024-01-01", "2024-01-02", "2024-01-03"]

    const { rerender } = render(
      <TimelineDateScrubber
        dates={dates}
        selectedDate="2024-01-01"
        onSelectedDateChange={() => {}}
      />,
    )

    expect(screen.getByRole("button", { name: "Previous day" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Next day" })).toBeEnabled()

    rerender(
      <TimelineDateScrubber
        dates={dates}
        selectedDate="2024-01-03"
        onSelectedDateChange={() => {}}
      />,
    )

    expect(screen.getByRole("button", { name: "Next day" })).toBeDisabled()
  })

  it("moves one day backward and forward with the buttons", () => {
    const onSelectedDateChange = vi.fn()

    render(
      <TimelineDateScrubber
        dates={["2024-01-01", "2024-01-02", "2024-01-03"]}
        selectedDate="2024-01-02"
        onSelectedDateChange={onSelectedDateChange}
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: "Previous day" }))
    fireEvent.click(screen.getByRole("button", { name: "Next day" }))

    expect(onSelectedDateChange).toHaveBeenNthCalledWith(1, "2024-01-01")
    expect(onSelectedDateChange).toHaveBeenNthCalledWith(2, "2024-01-03")
  })

  it("selects a day directly with the slider", () => {
    const onSelectedDateChange = vi.fn()

    render(
      <TimelineDateScrubber
        dates={["2024-01-01", "2024-01-02", "2024-01-03"]}
        selectedDate="2024-01-01"
        onSelectedDateChange={onSelectedDateChange}
      />,
    )

    fireEvent.change(screen.getByLabelText("Timeline date"), {
      target: { value: "2" },
    })

    expect(onSelectedDateChange).toHaveBeenCalledWith("2024-01-03")
  })
})
