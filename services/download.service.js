const { spawn } = require('child_process');

exports.processDownload = async (url, format, res) => {
  try {
    const fileName = `video.${format}`;
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    const args = [];

    if (format === 'mp3') {
      args.push(
        '-x',
        '--audio-format', 'mp3',
        '--format', 'bestaudio',
        '-o', '-',
        url
      );
    } else if (format === 'mp4') {
      args.push(
        '--format', 'mp4',
        '--recode-video', 'mp4', // 🔁 Forza recodificación si necesario
        '-o', '-',
        url
      );
    } else {
      throw new Error('Formato no soportado');
    }

    const ytdlp = spawn('yt-dlp', args);

    ytdlp.stdout.pipe(res);

    ytdlp.stderr.on('data', (data) => {
      console.error(`yt-dlp stderr: ${data}`);
    });

    ytdlp.on('error', (err) => {
      console.error('yt-dlp error:', err.message);
      res.status(500).end('Error al ejecutar yt-dlp');
    });

    ytdlp.on('close', (code) => {
      if (code !== 0) {
        console.error(`yt-dlp exited with code ${code}`);
        res.status(500).end('Descarga fallida');
      }
    });
  } catch (err) {
    console.error('Error en processDownload con yt-dlp:', err.message);
    res.status(500).end('Error interno del servidor');
  }
};
