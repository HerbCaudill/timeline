import { expect, test } from "@playwright/test"

test("starts on the most recent day, renders the map track, and supports previous-day navigation", async ({
  page,
}) => {
  await page.goto("/")
  await expect(page.getByRole("region", { name: "Location map" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Previous day" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Next day" })).toBeVisible()
  await expect(page.getByText("2026-05-03")).toBeVisible()
  await expect(page.locator(".location-track-line")).toHaveCount(1)
  await expect(page.locator(".location-track-start")).toHaveCount(1)
  await expect(page.locator(".location-track-end")).toHaveCount(1)

  await page.getByRole("button", { name: "Previous day" }).click()
  await expect(page.getByText("2026-05-02")).toBeVisible()
})
