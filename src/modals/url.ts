/* eslint-disable no-use-before-define */
import mongoose, { Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IURL } from '../interfaces/IURL';

interface IURLModel extends Model<IURL> {
	isShortHandAvailable: (shortHand: string) => boolean;
	findRedirect: (shortHand: string) => IURL | null;
}

const URLSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
		trim: true
	},
	shortHand: {
		type: String,
		required: true,
		trim: true
	}
});

URLSchema.statics.isShortHandAvailable = async (shortHand: string) => {
	const url: IURL | null = await URL.findOne({
		shortHand
	});

	if (!url) {
		return true;
	}

	return false;
};

URLSchema.statics.findRedirect = async (shortHand: string) => {
	const url: IURL | null = await URL.findOne({
		shortHand
	});

	return url;
};

const URL: IURLModel = mongoose.model<IURL, IURLModel>('URL', URLSchema);

export default URL;
