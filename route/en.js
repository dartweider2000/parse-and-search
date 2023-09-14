import { Router } from 'express';
import { getResponse } from '../helpres/http-get-response-helper.js';
import enBlogRouter from './en-blog.js';

const enRouter = Router();

enRouter.use(enBlogRouter);

enRouter.get('/en', getResponse);
enRouter.get('/en/help', getResponse);
enRouter.get('/en/about', getResponse);

enRouter.get('/en/search:q', getResponse);
enRouter.get('/en/video:q', getResponse);
enRouter.get('/en/images:q', getResponse);

export default enRouter;