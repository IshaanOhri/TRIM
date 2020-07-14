import { Router } from 'express';
import { shortenURL, redirect } from '../controllers/shortner';

const shortner: Router = Router();

shortner.post('/create', shortenURL);

shortner.get('/*', redirect);

export default shortner;
