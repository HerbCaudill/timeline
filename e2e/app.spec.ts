import { expect, test } from "@playwright/test"

test("starts on the most recent day and supports previous-day navigation", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("button", { name: "Previous day" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Next day" })).toBeVisible()
  await expect(page.getByText("2026-05-03")).toBeVisible()

  await page.getByRole("button", { name: "Previous day" }).click()
  await expect(page.getByText("2026-05-02")).toBeVisible()
})
