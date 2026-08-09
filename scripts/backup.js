const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const MONGO_URI = process.env.MONGO_URI;

function createBackup() {
  if (!MONGO_URI) {
    console.error('MONGO_URI not set. Cannot create backup.');
    process.exit(1);
  }

  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUP_DIR, `taj-biryani-${timestamp}`);

  console.log(`Creating backup: ${timestamp}`);

  try {
    execSync(`mongodump --uri="${MONGO_URI}" --out="${backupPath}"`, { stdio: 'inherit' });
    console.log(`Backup created at: ${backupPath}`);

    const files = fs.readdirSync(BACKUP_DIR);
    const backups = files.filter(f => f.startsWith('taj-biryani-')).sort().reverse();
    if (backups.length > 7) {
      backups.slice(7).forEach(old => {
        const oldPath = path.join(BACKUP_DIR, old);
        fs.rmSync(oldPath, { recursive: true, force: true });
        console.log(`Removed old backup: ${old}`);
      });
    }
  } catch (error) {
    console.error('Backup failed:', error.message);
    process.exit(1);
  }
}

createBackup();
