import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const mediaDir = path.join(root, "media");
const output = path.join(root, "media.json");
const supported = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".mp4", ".webm", ".mov", ".m4v"]);

const files = await readdir(mediaDir);
const media = files
  .filter((file) => supported.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, "ru"))
  .map((file) => ({
    src: `media/${file}`,
    title: titleFromFile(file),
  }));

await writeFile(output, `${JSON.stringify(media, null, 2)}\n`);
console.log(`Updated media.json: ${media.length} file(s)`);

function titleFromFile(file) {
  return path
    .basename(file, path.extname(file))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
