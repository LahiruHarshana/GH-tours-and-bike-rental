import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images');
const files = fs.readdirSync(dir);

async function run() {
  for (const file of files) {
    if (file.endsWith('.jpg')) {
      const input = path.join(dir, file);
      const output = path.join(dir, file.replace('.jpg', '.webp'));
      
      const stats = fs.statSync(input);
      console.log(`Processing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
      
      await sharp(input)
        .webp({ quality: 80 })
        .toFile(output);
        
      const outStats = fs.statSync(output);
      console.log(` -> Saved ${file.replace('.jpg', '.webp')} (${(outStats.size / 1024 / 1024).toFixed(2)} MB)`);
      
    }
  }
}

run().catch(console.error);
