/* eslint-disable no-loop-func */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import validator from 'validator';
import { code, message } from '../../config/messages';
import URL from '../../modals/url';
import { IURL } from '../../interfaces/IURL';
import logger from '../../logger/logger-config';
import { redisClient, getAsync } from '../../app';

const cryptoRandomString = require('crypto-random-string');

const { promisify } = require('util');

const shortenURL = async (req: Request, res: Response) => {
	let {
		url,
		shortHand,
		custom
	}: { url: string; shortHand: string; custom: boolean } = req.body;

	if (!validator.isURL(url)) {
		res.status(200).send({
			success: false,
			code: code.invalidURL,
			message: message.invalidURL
		});
		return;
	}

	if (url.includes(String(process.env.DOMAIN))) {
		res.status(200).send({
			success: false,
			code: code.alreadyShort,
			message: message.alreadyShort
		});
		return;
	}

	if (!custom) {
		let available: boolean = false;
		while (!available) {
			shortHand = cryptoRandomString({ length: 5, type: 'url-safe' });
			if ((await getAsync(shortHand)) === null) {
				available = true;
			}
		}
	} else if (
		custom &&
		!shortHand.match(/^([a-zA-Z0-9]+[-_]?[a-zA-Z0-9]+)+$/gm)
	) {
		res.status(200).send({
			success: false,
			code: code.invalidCustomURL,
			message: message.invalidCustomURL
		});
		return;
	}

	await redisClient.setnx(shortHand, url, async (err, reply) => {
		if (reply === 0) {
			res.status(200).send({
				success: false,
				code: code.shortHandUnavailable,
				message: message.shortHandUnavailable
			});
		} else {
			res.status(201).send({
				success: true,
				url,
				shortHand: `${process.env.DOMAIN}/${shortHand}`
			});
			const urlDB = new URL({
				url,
				shortHand
			});
			try {
				await urlDB.save();
			} catch {
				logger.error({
					code: message.dbEntry,
					message: message.dbEntry,
					shortHand
				});
			}
		}
	});
};

const redirect = async (req: Request, res: Response) => {
	await redisClient.get(req.url.slice(1), (err, reply) => {
		if (reply === null) {
			res.redirect('/');
		} else {
			res.redirect(reply);
		}
	});
};

export { shortenURL, redirect };
