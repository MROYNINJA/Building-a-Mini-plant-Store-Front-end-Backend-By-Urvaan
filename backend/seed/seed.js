import fs from 'fs';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import '../src/db.js';
import Plant from '../src/models/Plant.js';

dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  try {
    const dataPath = path.join(__dirname, 'seed', 'plants.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const items = JSON.parse(raw);

    await Plant.deleteMany({});
    await Plant.insertMany(items);
    console.log(`Seeded ${items.length} plants.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
