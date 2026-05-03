# Timeline notes

This app is for viewing personal location data on a map.

So far:
- location data is loaded from `public/data/locations.csv`
- the app has an in-memory location data layer under `src/data/location/`
- location rows are parsed into typed entries with date, timestamp, latitude, longitude, and device
- there are query helpers for filtering by day and by bounding box
- `backtrack` naming has been removed in favor of generic `location` naming
