import { expect, test } from "@playwright/test"

test("displays timeline date controls", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("button", { name: "Previous day" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Next day" })).toBeVisible()
  await expect(page.getByText("2026-02-25")).toBeVisible()
})
