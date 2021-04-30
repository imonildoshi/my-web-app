'use strict';

const express = require('express');
const redisClient = require('./redis-client');

const PORT = process.env.PORT;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/store/:key', async (req, res) => {
  const {key} = req.params;
  const value = req.query;
  await redisClient.setAsync(key, JSON.stringify(value));
  return res.send('Success');
});

app.get('/:key', async (req, res) => {
  const {key} = req.params;
  const rawData = await redisClient.getAsync(key);
  return res.json(JSON.parse(rawData));
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
