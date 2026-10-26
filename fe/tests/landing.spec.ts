import { test, expect } from "@playwright/test";

test("catalog filters, accessible product inquiry and FAQ work", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Good meat.",
  );
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Daging ayam" }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Lihat detail Boneless Dada Ayam" })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText("Boneless Dada Ayam");
  const href = await dialog
    .getByRole("link", { name: "Tanyakan produk ini" })
    .getAttribute("href");
  expect(href).toContain("https://wa.me/6281274877474");
  expect(decodeURIComponent(href!)).toContain("Boneless Dada Ayam");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Lihat detail Boneless Dada Ayam" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Semua pilihan" }).click();
  await expect(page.locator(".product-card")).toHaveCount(3);
  const question = page.getByRole("button", {
    name: "Bagaimana cara mendapatkan katalog dan harga?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#faq-1")).toBeVisible();
  await page.getByRole("button", { name: "Testimoni berikutnya" }).click();
  await expect(page.locator(".quote-name")).toHaveText("Chef Budi");
  expect(errors).toEqual([]);
});

test("mobile menu and layout work at narrow widths", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Buka menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Navigasi mobile" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Navigasi mobile" })
    .getByRole("link", { name: "Pilihan produk" })
    .click();
  await expect(
    page.getByRole("navigation", { name: "Navigasi mobile" }),
  ).not.toBeVisible();
  await expect(page).toHaveURL(/#produk$/);
  await page.waitForTimeout(1800);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const headingFits = await page
      .locator(".hero-line")
      .evaluateAll((lines) =>
        lines.every((line) => line.scrollWidth <= line.clientWidth + 1),
      );
    expect(headingFits).toBe(true);
  }
});

test("reduced motion preserves visible content and disables ambient motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");
  await expect(page.locator(".ambient-canvas")).toHaveCSS("display", "none");
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-name",
    "none",
  );
  await page.locator(".promise").scrollIntoViewIfNeeded();
  await expect(page.locator(".promise h2")).toHaveCSS("opacity", "1");
});
