#!/usr/bin/env bun

import { writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(__dirname, "../src/assets/fonts");

const UA =
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1";

async function downloadFont(
  fontFamily: string,
  weight: number,
  filename: string
) {
  const api = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weight}`;
  const css = await fetch(api, { headers: { "User-Agent": UA } }).then(r =>
    r.text()
  );

  const match = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/
  );
  if (!match) throw new Error(`No TTF/OTF found for ${fontFamily} ${weight}`);

  const data = await fetch(match[1]).then(r => r.arrayBuffer());
  await writeFile(join(fontsDir, filename), Buffer.from(data));
  console.log(`✓ ${filename} (${Math.round(data.byteLength / 1024)} KB)`);
}

console.log("Downloading IBM Plex Mono fonts...");
await downloadFont("IBM+Plex+Mono", 400, "IBMPlexMono-Regular.ttf");
await downloadFont("IBM+Plex+Mono", 700, "IBMPlexMono-Bold.ttf");
console.log("Done.");
