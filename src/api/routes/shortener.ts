import { Router } from 'express';
import { shortenURL, redirect } from '../controllers/shortener';

const shortener: Router = Router();

shortener.post('/create', shortenURL);

shortener.get('/*', redirect);

export default shortener;
