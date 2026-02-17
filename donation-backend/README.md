# Donation Backend API

A simple Node.js Express backend for updating donation data in your GitHub repository.

## Setup

1. Install dependencies:

```bash
npm install express axios dotenv
```

2. Set your GitHub token in `.env`:

```
GITHUB_TOKEN=your_github_token_here
```

3. Start the server:

```bash
node server.js
```

## Usage

POST to `http://localhost:3000/update-donation` with JSON:

```
{
  "familiesSupported": 123,
  "lastUpdated": "17 Feb 2026, 12:00"
}
```

The backend will update `data.json` in your GitHub repo.
