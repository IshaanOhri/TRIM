// eslint-disable-next-line no-unused-vars
import { Document } from 'mongoose';

export interface IURL extends Document {
	url: string;
	shortHand: string;
}
