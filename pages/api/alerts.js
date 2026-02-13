import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join('/tmp', 'reddit-alerts.json');

function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const alerts = readData();
  return res.status(200).json(alerts);
}
