// /server/controllers/download.controller.js

const downloadService = require('../services/download.service'); // 👈 Importación necesaria

exports.downloadVideo = async (req, res) => {
  const { url, format } = req.body;
  console.log(`[INFO] URL: ${url}, Format: ${format}`);

  try {
    await downloadService.processDownload(url, format, res);
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: error.message });
  }
};
