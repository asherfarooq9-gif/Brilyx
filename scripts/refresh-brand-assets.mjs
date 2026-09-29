import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Produces the site's logo derivatives from the canonical square BRILYX logo.
// The mark crop excludes the wordmark so it stays legible at favicon sizes.
const source = "public/brilyx-logo-source.png";
const markCrop = { left: 390, top: 260, width: 480, height: 520 };

const mark = await sharp(source)
  .extract(markCrop)
  .png()
  .toBuffer();

async function markIcon(size) {
  const artwork = await sharp(mark)
    .resize({ width: Math.round(size * 0.76), height: Math.round(size * 0.76), fit: "inside" })
    .png()
    .toBuffer();

  return sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: artwork, gravity: "center" }])
    .png()
    .toBuffer();
}

function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map(({ data }) => data)]);
}

const canonical = await readFile(source);
await writeFile("public/brilyx-logo.png", canonical);
await sharp(source).resize(512, 512).png().toFile("public/org-logo.png");

const [icon16, icon32, icon48, icon180, icon512] = await Promise.all(
  [16, 32, 48, 180, 512].map(async (size) => ({ size, data: await markIcon(size) })),
);

await writeFile("app/favicon.ico", ico([icon16, icon32, icon48]));
await writeFile("app/apple-icon.png", icon180.data);
await writeFile("app/icon.png", icon512.data);
