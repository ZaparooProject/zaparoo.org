const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'static/img/showcase';
const outputDir = 'static/img/showcase';

async function getAllImages() {
  const files = fs.readdirSync(inputDir);
  return files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
}

async function optimizeImage(filename) {
  const inputPath = path.join(inputDir, filename);
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);
  const webpPath = path.join(outputDir, `${basename}.webp`);

  try {
    // Skip if WebP already exists and is newer
    if (fs.existsSync(webpPath)) {
      const originalStats = fs.statSync(inputPath);
      const webpStats = fs.statSync(webpPath);
      if (webpStats.mtime > originalStats.mtime) {
        console.log(`⏭️  ${filename} -> WebP already exists and is up to date`);
        return;
      }
    }

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);

    // Convert to WebP with optimization
    await sharp(inputPath)
      .webp({
        quality: 80,
        effort: 6,
        lossless: false
      })
      .toFile(webpPath);

    // Get new file size
    const newStats = fs.statSync(webpPath);
    const newSize = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = ((originalStats.size - newStats.size) / originalStats.size * 100).toFixed(1);

    console.log(`✅ ${filename} -> ${basename}.webp`);
    console.log(`   Original: ${originalSize}MB | WebP: ${newSize}MB | Savings: ${savings}%`);

  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting comprehensive image optimization...\n');

  const images = await getAllImages();
  console.log(`Found ${images.length} images to optimize\n`);

  let totalOriginalSize = 0;
  let totalWebPSize = 0;

  for (const filename of images) {
    await optimizeImage(filename);

    // Calculate running totals
    const originalPath = path.join(inputDir, filename);
    const ext = path.extname(filename);
    const basename = path.basename(filename, ext);
    const webpPath = path.join(outputDir, `${basename}.webp`);

    if (fs.existsSync(originalPath)) {
      totalOriginalSize += fs.statSync(originalPath).size;
    }
    if (fs.existsSync(webpPath)) {
      totalWebPSize += fs.statSync(webpPath).size;
    }

    console.log('');
  }

  const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
  const totalWebPMB = (totalWebPSize / 1024 / 1024).toFixed(2);
  const totalSavings = ((totalOriginalSize - totalWebPSize) / totalOriginalSize * 100).toFixed(1);

  console.log('📊 OPTIMIZATION SUMMARY:');
  console.log(`   Total Original Size: ${totalOriginalMB}MB`);
  console.log(`   Total WebP Size: ${totalWebPMB}MB`);
  console.log(`   Total Savings: ${totalSavings}% (${(totalOriginalSize - totalWebPSize) / 1024 / 1024} MB)`);
  console.log('\n✨ All showcase images optimized!');
}

main().catch(console.error);