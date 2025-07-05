const express = require('express');
const cors = require('cors');
const downloadRoutes = require('./routes/download.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/download', downloadRoutes);

module.exports = app;
