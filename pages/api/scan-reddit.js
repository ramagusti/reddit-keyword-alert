import fs from 'fs';
import path from 'path';

const ALERTS_FILE = path.join('/tmp', 'reddit-alerts.json');
const MATCHES_FILE = path.join('/tmp', 'reddit-matches.json');

function readAlerts() {
  try {
    if (!fs.existsSync(ALERTS_FILE)) return [];
    return JSON.parse(fs.readFileSync(ALERTS_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function readMatches() {
  try {
    if (!fs.existsSync(MATCHES_FILE)) return [];
    return JSON.parse(fs.readFileSync(MATCHES_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function writeMatches(data) {
  fs.writeFileSync(MATCHES_FILE, JSON.stringify(data, null, 2));
}

// Fetch posts from Reddit
async function fetchRedditPosts(subreddit = 'all', after = null) {
  const url = subreddit === 'all' 
    ? 'https://www.reddit.com/r/all/new.json?limit=100'
    : `https://www.reddit.com/r/${subreddit}/new.json?limit=100`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Reddit-Keyword-Alert/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.children.map(child => ({
      id: child.data.id,
      title: child.data.title,
      selftext: child.data.selftext,
      url: `https://reddit.com${child.data.permalink}`,
      subreddit: child.data.subreddit,
      author: child.data.author,
      created_utc: child.data.created_utc,
      score: child.data.score
    }));
  } catch (error) {
    console.error('Error fetching Reddit:', error);
    return [];
  }
}

// Check if post matches any alert
function checkMatches(post, alerts) {
  const matches = [];
  const postText = `${post.title} ${post.selftext}`.toLowerCase();
  
  for (const alert of alerts) {
    if (!alert.active) continue;
    
    // Check if subreddit matches (if specified)
    if (alert.subreddits.length > 0) {
      const postSubreddit = post.subreddit.toLowerCase();
      const matchesSubreddit = alert.subreddits.some(s => 
        postSubreddit === s.toLowerCase()
      );
      if (!matchesSubreddit) continue;
    }
    
    // Check if keywords match
    for (const keyword of alert.keywords) {
      if (postText.includes(keyword.toLowerCase())) {
        matches.push({
          alertId: alert.id,
          keyword,
          email: alert.email,
          post
        });
        break; // Only match once per alert
      }
    }
  }
  
  return matches;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const alerts = readAlerts();
    
    if (alerts.length === 0) {
      return res.status(200).json({ message: 'No active alerts' });
    }

    // Get unique subreddits to monitor
    const subreddits = [...new Set(
      alerts.flatMap(a => a.subreddits.length > 0 ? a.subreddits : ['all'])
    )];

    let allMatches = [];
    const seenPostIds = new Set(readMatches().map(m => m.post.id));

    // Fetch posts from each subreddit
    for (const subreddit of subreddits) {
      const posts = await fetchRedditPosts(subreddit);
      
      for (const post of posts) {
        // Skip already seen posts
        if (seenPostIds.has(post.id)) continue;
        
        const matches = checkMatches(post, alerts);
        allMatches = allMatches.concat(matches);
      }
    }

    // Save new matches
    if (allMatches.length > 0) {
      const existingMatches = readMatches();
      writeMatches([...allMatches, ...existingMatches]);
      
      // Here you would typically send emails
      // For now, just log them
      console.log(`Found ${allMatches.length} new matches`);
    }

    return res.status(200).json({
      message: `Scan complete. Found ${allMatches.length} new matches.`,
      matches: allMatches
    });

  } catch (error) {
    console.error('Error scanning Reddit:', error);
    return res.status(500).json({ error: 'Failed to scan Reddit' });
  }
}
