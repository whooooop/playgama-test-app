const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function createDistZip() {
  return new Promise((resolve, reject) => {
    const distPath = path.join(__dirname, '..', 'dist');
    const zipPath = path.join(__dirname, '..', 'dist/build.zip');

    if (!fs.existsSync(distPath)) {
      reject(new Error('dist folder not found. Run npm run build first'));
      return;
    }

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    output.on('close', () => {
      console.log(`✅ Zip archive created: ${zipPath}`);
      console.log(`📦 Zip archive size: ${archive.pointer()} bytes`);
      resolve();
    });

    archive.on('error', err => {
      reject(err);
    });

    archive.pipe(output);

    archive.directory(distPath, false);

    archive.finalize();
  });
}

if (require.main === module) {
  createDistZip()
    .then(() => {
      console.log('🎉 Zip archive created successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Error creating zip archive:', error.message);
      process.exit(1);
    });
}

module.exports = createDistZip;
