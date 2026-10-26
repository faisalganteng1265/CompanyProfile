import { test, expect } from "@playwright/test";

test("shared navigation opens real pages and retains a single header and footer", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Navigasi utama" });
  for (const [name, path] of [
    ["Tentang kami", "/tentang"],
    ["Pilihan produk", "/produk"],
    ["Distribusi", "/distribusi"],
  ]) {
    await nav.getByRole("link", { name }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(nav.getByRole("link", { name })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(page.locator("header.site-header")).toHaveCount(1);
    await expect(page.locator("footer.site-footer")).toHaveCount(1);
  }
  await page.locator(".header-contact").click();
  await expect(page).toHaveURL(/\/kontak$/);
  await expect(page.locator(".consultation-form")).toBeVisible();
  expect(errors).toEqual([]);
});

test("full catalog searches 25 products and handles empty results", async ({
  page,
}) => {
  await page.goto("/produk");
  await expect(page.locator(".directory-row")).toHaveCount(25);
  await page.getByRole("button", { name: "Seafood" }).click();
  await expect(page.locator(".directory-row")).toHaveCount(4);
  await page.getByRole("searchbox", { name: "Cari produk" }).fill("salmon");
  await expect(page.locator(".directory-row")).toHaveCount(1);
  await expect(page.locator(".directory-row")).toContainText(
    "Ikan Salmon Fillet",
  );
  await page
    .getByRole("searchbox", { name: "Cari produk" })
    .fill("tidak-ada-produk");
  await expect(page.locator(".catalog-empty")).toBeVisible();
  await page.getByRole("button", { name: "Tampilkan semua produk" }).click();
  await expect(page.locator(".directory-row")).toHaveCount(25);
  await page
    .locator(".directory-row")
    .filter({ hasText: "Tenderloin Meltique" })
    .click();
  await expect(page).toHaveURL(/\/produk\/tenderloin-meltique$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Tenderloin Meltique",
  );
});

test("product inquiry carries the selection into a reviewable WhatsApp message", async ({
  page,
}) => {
  await page.goto("/produk/tenderloin-meltique");
  await page.getByRole("link", { name: "Diskusikan kebutuhan Anda" }).click();
  await expect(page.getByLabel("Pilihan produk")).toHaveValue(
    "Tenderloin Meltique",
  );
  await page.getByRole("textbox", { name: "Nama Anda" }).fill("Faisal");
  await page.getByRole("textbox", { name: "Nama usaha" }).fill("Dapur Solo");
  await page
    .getByRole("textbox", { name: "Kota / kabupaten" })
    .fill("Surakarta");
  await page
    .getByRole("textbox", { name: "Apa yang bisa kami bantu?" })
    .fill("Kebutuhan steak 20 kg per minggu.");
  await page.getByLabel("Ingin berbicara dengan").selectOption("6281330273323");
  await page.getByRole("button", { name: "Siapkan percakapan" }).click();
  await expect(page.locator(".prepared-message")).toBeVisible();
  const href = await page
    .getByRole("link", { name: "Buka pesan di WhatsApp" })
    .getAttribute("href");
  expect(href).toContain("https://wa.me/6281330273323");
  for (const text of [
    "Faisal",
    "Dapur Solo",
    "Surakarta",
    "Tenderloin Meltique",
    "20 kg",
  ])
    expect(decodeURIComponent(href!)).toContain(text);
  await page.getByRole("textbox", { name: "Nama Anda" }).fill("Faisal Akmal");
  await expect(page.locator(".prepared-message")).not.toBeVisible();
});

test("distribution nodes and location inquiry work without asserting coverage", async ({
  page,
}) => {
  await page.goto("/distribusi");
  await page.getByRole("button", { name: "Hotel & hospitality" }).click();
  await expect(page.locator(".network-tooltip h3")).toHaveText(
    "Hotel & hospitality",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  for (const title of [
    "Restoran & café",
    "Hotel & hospitality",
    "Katering & food service",
  ]) {
    await page.getByRole("button", { name: title }).click();
    await expect(page.locator(".network-tooltip h3")).toHaveText(title);
  }
  await page.getByLabel("Di mana lokasi usaha Anda?").fill("Yogyakarta");
  const link = page.getByRole("link", { name: "Tanyakan pengiriman" });
  await expect(link).toHaveAttribute("aria-disabled", "false");
  expect(decodeURIComponent((await link.getAttribute("href"))!)).toContain(
    "Yogyakarta",
  );
});

test("interior pages remain readable without horizontal overflow at mobile and tablet sizes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of [
    "/tentang",
    "/produk",
    "/distribusi",
    "/kontak",
    "/produk/tenderloin-meltique",
    "/produk/iga-shortrib",
  ]) {
    await page.goto(path);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} at ${width}`,
      ).toBe(true);
      const textFits = await page
        .locator("h1")
        .evaluate((el) => el.scrollWidth <= el.clientWidth + 1);
      expect(textFits, `${path} heading at ${width}`).toBe(true);
    }
  }
});

test("legacy routes redirect and unknown products return a useful 404", async ({
  request,
  page,
}) => {
  for (const [oldPath, newPath] of [
    ["/about", "/tentang"],
    ["/product", "/produk"],
    ["/distribution", "/distribusi"],
    ["/elementor-134", "/kontak"],
  ]) {
    const response = await request.get(oldPath, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(newPath);
  }
  await page.goto("/produk/tidak-ada-produk");
  await expect(
    page.locator('meta[name="robots"][content="noindex"]'),
  ).toBeAttached();
  await expect(
    page.getByRole("link", { name: "Lihat pilihan produk" }),
  ).toBeVisible();
});
