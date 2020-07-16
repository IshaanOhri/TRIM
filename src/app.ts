import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import redis, { RedisClient } from 'redis';
import logger from './logger/logger-config';
import { message } from './config/messages';
import shortener from './api/routes/shortener';

require('./database/database');

const { promisify } = require('util');

const app = express();

const { PORT, REDIS_PORT } = process.env;

const redisClient: RedisClient = redis.createClient(String(REDIS_PORT));

const getAsync = promisify(redisClient.get).bind(redisClient);

redisClient.on('connect', () => {
	logger.info(`Redis running at http://localhost:${REDIS_PORT}`);
});

redisClient.on('error', () => {
	logger.info(`Redis connection failure`);
});

// app.use(
// 	express.static(path.join(__dirname, '../public'), {
// 		index: 'index.html'
// 	})
// );

app.use(
	morgan((tokens, req, res) => {
		logger.info(
			`Method: ${tokens.method(req, res)} URL: ${tokens.url(
				req,
				res
			)} Status: ${tokens.status(req, res)} Resp Time: ${tokens[
				'response-time'
			](req, res)} ms`
		);
		return null;
	})
);

app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
	res.send({
		success: true,
		message: message.health
	});
});

app.use(shortener);

app.listen(PORT, () => {
	logger.info(`Server running on http://localhost:${PORT}`);
});

export { redisClient, getAsync };
