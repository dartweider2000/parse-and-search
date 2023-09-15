import { Router } from 'express';
import { getResponse, getSearch } from '../helpres/http-get-response-helper.js';
import enBlogRouter from './en-blog.js';

const enRouter = Router();

enRouter.use(enBlogRouter);

enRouter.get('/en', getResponse);
enRouter.get('/en/help', getResponse);
enRouter.get('/en/about', getResponse);

enRouter.get('/en/search', getSearch);
enRouter.get('/en/video', getSearch);
enRouter.get('/en/images', getSearch);

export default enRouter;