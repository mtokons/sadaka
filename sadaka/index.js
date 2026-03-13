const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

function getConfig() {
	const cfg = functions.config().github || {};
	return {
		GITHUB_TOKEN: cfg.token || process.env.GITHUB_TOKEN,
		REPO_OWNER: cfg.owner || process.env.REPO_OWNER,
		REPO_NAME: cfg.repo || process.env.REPO_NAME,
		DATA_PATH: cfg.data_path || process.env.DATA_PATH || 'data.json'
	};
}

function githubApi(cfg) {
	return `https://api.github.com/repos/${cfg.REPO_OWNER}/${cfg.REPO_NAME}/contents/${cfg.DATA_PATH}`;
}

async function getCurrentSha(api, token) {
	const resp = await axios.get(api, { headers: { Authorization: `Bearer ${token}` } });
	return resp.data.sha;
}

app.post('/update-donation', async (req, res) => {
	const { familiesSupported, lastUpdated } = req.body;
	if (typeof familiesSupported !== 'number' || !lastUpdated) {
		return res.status(400).json({ error: 'Invalid input' });
	}
	try {
		const cfg = getConfig();
		const api = githubApi(cfg);
		const sha = await getCurrentSha(api, cfg.GITHUB_TOKEN);
		const newData = { familiesSupported, lastUpdated };
		const content = Buffer.from(JSON.stringify(newData, null, 2)).toString('base64');
		const resp = await axios.put(api, {
			message: `Update: ${familiesSupported} families supported`,
			content,
			sha
		}, {
			headers: { Authorization: `Bearer ${cfg.GITHUB_TOKEN}` }
		});
		res.json({ success: true, commit: resp.data.commit.sha });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

exports.app = functions.https.onRequest(app);
