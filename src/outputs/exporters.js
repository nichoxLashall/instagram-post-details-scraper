import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function exportResults(results) {
try {
const outputPath = path.join(__dirname, '..', '..', 'data', 'sample_output.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
} catch (err) {
console.error("Export error:", err.message);
}
}