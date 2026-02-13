# Reddit Keyword Alert Tool

Monitor Reddit for specific keywords and get email notifications when they're mentioned.

## Features

- 🔍 Monitor specific keywords across Reddit
- 📧 Email notifications when keywords are found
- 🎯 Target specific subreddits or monitor all of Reddit
- 📊 View match history
- ⚡ Real-time scanning

## How to Use

1. Enter keywords you want to monitor (comma-separated)
2. Optionally specify subreddits to monitor
3. Enter your email for notifications
4. Click "Create Alert"

## API Endpoints

### Create Alert
```
POST /api/create-alert
Body: {
  "keywords": ["startup", "saas"],
  "subreddits": ["startups", "marketing"],
  "email": "your@email.com"
}
```

### Get Alerts
```
GET /api/alerts
```

### Scan Reddit (for cron job)
```
POST /api/scan-reddit
```

## Legal Marketing Guidelines for Reddit

### ✅ DO:
- **Be Transparent**: Clearly state you're the creator when posting about your tool
- **Provide Value**: Share genuinely useful content, not just promotional posts
- **Engage Authentically**: Participate in discussions before promoting
- **Follow Subreddit Rules**: Each subreddit has specific self-promotion rules
- **Use Appropriate Subreddits**:
  - r/SideProject - For sharing side projects
  - r/Startups - For startup-related tools
  - r/marketing - For marketing tools
  - r/webdev - For web development tools
  - r/entrepreneur - For business tools

### ❌ DON'T:
- **Spam**: Don't post the same content repeatedly
- **Hide Affiliation**: Always disclose you're the creator
- **Post Without Context**: Don't just drop links
- **Ignore Moderators**: If asked to stop, stop immediately
- **Use Bots**: Don't use automated posting tools
- **Buy Upvotes**: This violates Reddit's Terms of Service

### Best Practices:
1. **Build Karma First**: Participate in communities before promoting
2. **Tell Your Story**: Share your journey building the tool
3. **Ask for Feedback**: Frame posts as seeking feedback, not promotion
4. **Respond to Comments**: Engage with everyone who comments
5. **Follow the 90/10 Rule**: 90% valuable content, 10% promotion

### Subreddit-Specific Guidelines:
- **r/SideProject**: Encourages sharing, but include details about tech stack and challenges
- **r/Startups**: Focus on business value and problem-solving
- **r/marketing**: Emphasize how it helps with marketing research
- **r/webdev**: Share technical implementation details

## Technical Stack

- Next.js 14
- React
- Tailwind CSS
- Reddit API (public endpoints)

## Deployment

Deploy to Vercel:
```bash
npx vercel --prod
```

## License

MIT
