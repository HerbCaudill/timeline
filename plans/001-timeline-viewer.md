# Location timeline viewer

## Goal

Build a mobile-first, map-first location timeline viewer that shows a continuous day-by-day history over a real basemap.

## Approach

Use React Leaflet for a full-screen slippy map with a compact mobile footer containing previous/next day buttons and a one-day-step slider. Keep the UI bound to a query layer rather than raw CSV loading. Extend the existing in-memory location data layer with timeline-oriented queries that expose a continuous date range and an effective per-day track.

The effective track should treat missing days as stationary at the last known location, and for days with samples it should begin at the previous day's last known location when available. The first day in the dataset is a special case and starts with its own recorded samples only.

For v1, the map should default to the most recent day, fit to that day's track on selection, draw straight line segments, always show start and end markers, and reveal individual circular sample points only beyond a zoom threshold. Clicking a point should open a simple timestamp popup. The top overlay should show only the selected date.

## Tasks

1. Add timeline query functions for continuous date navigation and effective day tracks built on top of the existing location query layer.
2. Add tests covering gap-day inference, previous-day carry-forward, first-day behavior, and date-range stepping.
3. Integrate React Leaflet and build a full-screen mobile-first map shell.
4. Build the date controls: previous/next buttons and a one-day-step slider across the full continuous date range.
5. Render the selected day's effective track with straight segments, start/end markers, zoom-gated sample dots, and timestamp popups.
6. Wire app state so startup selects the most recent day and map viewport refits on day changes.
7. Add end-to-end coverage for basic day navigation and map rendering.

## Unresolved Questions

None.
