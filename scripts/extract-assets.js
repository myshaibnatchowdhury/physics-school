const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/images/reference-design.jpg');
const logoPath = path.join(__dirname, '../public/images/logo.png');
const outDir = path.join(__dirname, '../public/images');

async function run() {
  console.log('Reading reference image:', inputPath);
  const meta = await sharp(inputPath).metadata();
  console.log(`Original dimensions: ${meta.width}x${meta.height}`);

  // 1. Hero right side (atomic sculpture with book & chalkboard)
  // Let's crop the hero physics visual
  await sharp(inputPath)
    .extract({ left: 375, top: 38, width: 255, height: 200 })
    .toFile(path.join(outDir, 'hero-atom.jpg'));
  console.log('Extracted hero-atom.jpg');

  // Also let's extract the full hero background texture/vibe
  await sharp(inputPath)
    .extract({ left: 18, top: 38, width: 615, height: 200 })
    .toFile(path.join(outDir, 'hero-bg-ref.jpg'));
  console.log('Extracted hero-bg-ref.jpg');

  // 2. Course Cards
  // y roughly 342, height 58
  await sharp(inputPath)
    .extract({ left: 32, top: 341, width: 114, height: 58 })
    .toFile(path.join(outDir, 'course-mechanics.jpg'));

  await sharp(inputPath)
    .extract({ left: 151, top: 341, width: 115, height: 58 })
    .toFile(path.join(outDir, 'course-quantum.jpg'));

  await sharp(inputPath)
    .extract({ left: 271, top: 341, width: 115, height: 58 })
    .toFile(path.join(outDir, 'course-electromagnetism.jpg'));

  await sharp(inputPath)
    .extract({ left: 390, top: 341, width: 116, height: 58 })
    .toFile(path.join(outDir, 'course-thermodynamics.jpg'));

  await sharp(inputPath)
    .extract({ left: 510, top: 341, width: 115, height: 58 })
    .toFile(path.join(outDir, 'course-optics.jpg'));
  console.log('Extracted course cards');

  // 3. Why Choose Student
  await sharp(inputPath)
    .extract({ left: 228, top: 501, width: 202, height: 160 })
    .toFile(path.join(outDir, 'why-choose-student.jpg'));
  console.log('Extracted why-choose-student.jpg');

  // 4. Testimonial Avatars
  await sharp(inputPath)
    .extract({ left: 440, top: 529, width: 24, height: 24 })
    .resize(96, 96)
    .toFile(path.join(outDir, 'avatar-rafid.jpg'));

  await sharp(inputPath)
    .extract({ left: 508, top: 529, width: 24, height: 24 })
    .resize(96, 96)
    .toFile(path.join(outDir, 'avatar-nusrat.jpg'));

  await sharp(inputPath)
    .extract({ left: 576, top: 529, width: 24, height: 24 })
    .resize(96, 96)
    .toFile(path.join(outDir, 'avatar-tanvir.jpg'));
  console.log('Extracted avatars');

  // 5. Final CTA Planet
  await sharp(inputPath)
    .extract({ left: 885, top: 550, width: 120, height: 62 })
    .toFile(path.join(outDir, 'cta-planet.jpg'));
  console.log('Extracted cta-planet.jpg');

  // 6. Student Dashboard Preview screenshot (so the student dashboard preview matches the reference exactly!)
  // Dashboard preview on right side: x roughly 645, y 98, width 355, height 215
  await sharp(inputPath)
    .extract({ left: 647, top: 97, width: 350, height: 215 })
    .toFile(path.join(outDir, 'dashboard-preview.jpg'));
  console.log('Extracted dashboard-preview.jpg');

  // 7. Logo treatment:
  // Create a version for dark header/footer where navy text is crisp white
  // Let's read logo.png
  const logoRaw = await sharp(logoPath).raw().toBuffer({ resolveWithObject: true });
  const { data, info } = logoRaw;
  const logoWidth = info.width;
  const logoHeight = info.height;
  
  // Make a copy for dark background:
  // Any dark navy pixel (r < 40, g < 50, b < 70, a > 100) -> turn to white (255, 255, 255, a)
  // Orange stays orange (r > 200, g > 120, b < 80)
  // Blue in icon stays blue
  // Wait, the word "PHYSICS" is at the bottom (y > 600)
  const darkBuf = Buffer.from(data);
  for (let y = 0; y < logoHeight; y++) {
    for (let x = 0; x < logoWidth; x++) {
      const idx = (y * logoWidth + x) * 4;
      const r = darkBuf[idx];
      const g = darkBuf[idx + 1];
      const b = darkBuf[idx + 2];
      const a = darkBuf[idx + 3];

      // If it's the "PHYSICS" text or graduation cap / dark navy parts:
      // In the dark header (see Attachment 2), the logo has the icon (cap + atom + P) and the text "PHYSICS" is white, and "SCHOOL" is orange!
      if (y > 620 && a > 40) {
        // This is the text region
        // If it's not orange (orange has high red > 200 and low blue < 80)
        if (!(r > 200 && b < 80)) {
          // It's the "PHYSICS" text!
          darkBuf[idx] = 255;
          darkBuf[idx + 1] = 255;
          darkBuf[idx + 2] = 255;
        }
      }
    }
  }

  await sharp(darkBuf, { raw: { width: logoWidth, height: logoHeight, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'logo-white-text.png'));
  console.log('Created logo-white-text.png for dark navigation & footer!');

  // Also create a compact emblem mark (just the cap + P + atom icon without text)
  await sharp(logoPath)
    .extract({ left: 240, top: 100, width: 540, height: 520 })
    .png()
    .toFile(path.join(outDir, 'logo-mark.png'));
  console.log('Created logo-mark.png');

  // Upscale course images and visuals for crisp display
  const toUpscale = [
    { file: 'hero-atom.jpg', width: 800, height: 600 },
    { file: 'course-mechanics.jpg', width: 600, height: 320 },
    { file: 'course-quantum.jpg', width: 600, height: 320 },
    { file: 'course-electromagnetism.jpg', width: 600, height: 320 },
    { file: 'course-thermodynamics.jpg', width: 600, height: 320 },
    { file: 'course-optics.jpg', width: 600, height: 320 },
    { file: 'why-choose-student.jpg', width: 800, height: 620 },
    { file: 'cta-planet.jpg', width: 600, height: 320 },
    { file: 'dashboard-preview.jpg', width: 1000, height: 600 },
  ];

  for (const item of toUpscale) {
    const src = path.join(outDir, item.file);
    const dest = path.join(outDir, item.file.replace('.jpg', '-hd.jpg'));
    await sharp(src)
      .resize(item.width, item.height, { fit: 'cover', kernel: 'lanczos3' })
      .sharpen({ sigma: 1.2, m1: 1.0, m2: 2.0 })
      .jpeg({ quality: 95 })
      .toFile(dest);
    console.log(`Created HD version: ${item.file.replace('.jpg', '-hd.jpg')}`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
