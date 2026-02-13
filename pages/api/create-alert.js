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

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { keywords, subreddits, email } = req.body;

  if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
    return res.status(400).json({ error: 'Keywords are required' });
  }

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const alerts = readData();
  
  const newAlert = {
    id: Date.now().toString(),
    keywords,
    subreddits: subreddits || [],
    email,
    createdAt: new Date().toISOString(),
    active: true
  };

  alerts.push(newAlert);
  writeData(alerts);

  return res.status(201).json({ 
    message: 'Alert created successfully',
    alert: newAlert 
  });
}
