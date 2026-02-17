require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = 'mtokons/sadaka';
const FILE_PATH = 'data.json';

app.post('/update-donation', async (req, res) => {
  const { familiesSupported, lastUpdated } = req.body;
  if (!GITHUB_TOKEN) return res.status(500).json({ error: 'GitHub token not set' });
  if (typeof familiesSupported !== 'number' || !lastUpdated) return res.status(400).json({ error: 'Invalid input' });

  try {
    // Get file SHA
    const shaResp = await axios.get(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });
    const sha = shaResp.data.sha;

    // Prepare new content
    const newContent = Buffer.from(JSON.stringify({ familiesSupported, lastUpdated }, null, 2)).toString('base64');

    // Update file
    await axios.put(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
      message: `Update familiesSupported to ${familiesSupported}`,
      content: newContent,
      sha
    }, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Donation backend running on http://localhost:3000');
});
