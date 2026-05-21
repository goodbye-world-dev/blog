import { readFile } from "fs/promises";
import { join } from "path";

const fontsDir = join(process.cwd(), "src/assets/fonts");

async function loadLocalFont(filename: string): Promise<ArrayBuffer> {
  const buf = await readFile(join(fontsDir, filename));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

async function loadGoogleFonts(): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const [regular, bold] = await Promise.all([
    loadLocalFont("IBMPlexMono-Regular.ttf"),
    loadLocalFont("IBMPlexMono-Bold.ttf"),
  ]);

  return [
    { name: "IBM Plex Mono", data: regular, weight: 400, style: "normal" },
    { name: "IBM Plex Mono", data: bold, weight: 700, style: "bold" },
  ];
}

export default loadGoogleFonts;
