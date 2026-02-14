# 🔔 Reddit Alert - AI-Powered Reddit Research Tool

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://reddit-alert.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-View%20Code-black)](https://github.com/ramagusti/reddit-keyword-alert)

> **Never miss a conversation that matters.** Monitor Reddit for keywords and get instant email notifications when your brand, product, or interests are mentioned.

![Reddit Alert Preview](https://reddit-alert.vercel.app/logo.png)

## ✨ What It Does

**Reddit Alert** helps founders, marketers, and researchers track relevant conversations across Reddit in real-time. Whether you're validating a product idea, monitoring your brand, or researching competitors - you'll know the moment someone mentions what you care about.

### Key Features

- 🔍 **Keyword Monitoring** - Track unlimited keywords across all of Reddit
- 📧 **Email Alerts** - Get notified instantly when keywords are found
- 🎯 **Subreddit Targeting** - Focus on specific communities or monitor everything
- 📊 **Alert Management** - View and manage all your active alerts
- ⚡ **Real-time Scanning** - Fast, efficient Reddit API integration
- 🎨 **Beautiful UI** - Clean, modern interface with Reddit-inspired design

## 🚀 Live Demo

**👉 https://reddit-alert.vercel.app**

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with API routes |
| **Tailwind CSS** | Modern, responsive styling |
| **Reddit API** | Real-time post and comment data |
| **Vercel** | Serverless deployment & hosting |

## 💡 Use Cases

- **Product Validation** - See what people are saying about your problem space
- **Brand Monitoring** - Track mentions of your company or products
- **Competitor Research** - Monitor conversations about competitors
- **Trend Spotting** - Catch emerging trends in your industry
- **Community Building** - Find relevant discussions to engage with

## 📡 API Endpoints

```bash
# Create a new alert
POST /api/create-alert
{
  "keywords": ["startup", "saas"],
  "subreddits": ["startups", "marketing"],
  "email": "you@example.com"
}

# List all alerts
GET /api/alerts

# Trigger manual scan
POST /api/scan-reddit
```

## 🎯 Why I Built This

While researching SaaS opportunities on Reddit, I noticed founders spending **hours manually searching** for validation data. Reddit Alert automates that research, turning days of manual work into instant notifications.

This tool was built as part of my **"SaaS from Reddit Pain Points"** project - identifying real problems people discuss, then shipping solutions fast.

## 📈 Impact

- Validated through Reddit research showing demand for automated research tools
- Built and deployed in a single day
- Solves a real pain point for founders and marketers

## 🔮 Future Roadmap

- [ ] AI-powered pain point extraction from posts
- [ ] Weekly digest reports with insights
- [ ] Slack/Discord webhook integrations
- [ ] Sentiment analysis on mentions
- [ ] Chrome extension for on-page alerts

## 🏆 What I Learned

- **Rapid Prototyping** - Ship fast, validate with real users
- **API Integration** - Working with Reddit's public API efficiently
- **Serverless Architecture** - Vercel deployment for zero-cost scaling
- **Product-Market Fit** - Building from validated pain points, not assumptions

## 📄 License

MIT License - Feel free to use and modify.

---

**Built by Rama Gusti** | [Portfolio](https://github.com/ramagusti) | [Twitter](#)

*Part of the "Vibe-Coding SaaS Tools" collection - real problems, shipped fast.*
