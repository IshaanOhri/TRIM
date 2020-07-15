/* eslint-disable no-loop-func */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import validator from 'validator';
import { code, message } from '../../config/messages';
import URL from '../../modals/url';
import logger from '../../logger/logger-config';
import { getAsync, redisClient } from '../../app';

const cryptoRandomString = require('crypto-random-string');

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
	} else if (custom && !shortHand.match(/^([a-zA-Z0-9]+[-_.~]?)+$/gm)) {
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
	const site = await getAsync(req.url.slice(1));
	if (site !== null) {
		res.redirect(site);
	} else {
		res.redirect('/');
	}
};

export { shortenURL, redirect };
