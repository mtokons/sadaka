import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json());

const {
  GITHUB_TOKEN,
  REPO_OWNER,
  REPO_NAME,
  DATA_PATH
} = process.env;

const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_PATH}`;

// Helper: Get current SHA
async function getCurrentSha() {
  const resp = await axios.get(GITHUB_API, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
  });
  return resp.data.sha;
}

// POST /update-donation
app.post('/update-donation', async (req, res) => {
  const { familiesSupported, lastUpdated } = req.body;
  if (typeof familiesSupported !== 'number' || !lastUpdated) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const sha = await getCurrentSha();
    const newData = {
      familiesSupported,
      lastUpdated
    };
    const content = Buffer.from(JSON.stringify(newData, null, 2)).toString('base64');
    const resp = await axios.put(GITHUB_API, {
      message: `Update: ${familiesSupported} families supported`,
      content,
      sha
    }, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });
    res.json({ success: true, commit: resp.data.commit.sha });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
