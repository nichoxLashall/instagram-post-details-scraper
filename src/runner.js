import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import parseInstagramPost from './extractors/instagram_parser.js';
import { exportResults } from './outputs/exporters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
try {
const inputPath = path.join(__dirname, '..', 'data', 'inputs.sample.json');
const raw = fs.readFileSync(inputPath, 'utf-8');
const posts = JSON.parse(raw);

const results = [];
for (const url of posts.post_urls) {
const parsed = await parseInstagramPost(url);
results.push(parsed);
}

exportResults(results);
console.log("Scraping complete. Output saved.");
} catch (err) {
console.error("Runner error:", err.message);
}
}

run();