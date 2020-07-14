import mongoose from 'mongoose';
import logger from '../logger/logger-config';

mongoose.connect(
	String(process.env.DATABASE_URL),
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	(error: any): void => {
		if (error) {
			logger.info(`Database connection failed\n${error}`);
			return;
		}

		logger.info('Database connection successful');
	}
);
