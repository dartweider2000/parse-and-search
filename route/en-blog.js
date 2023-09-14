import { Router } from 'express';
import { getResponse } from '../helpres/http-get-response-helper.js';

const enBlogRouter = Router();

enBlogRouter.get('/en/blog', getResponse);
enBlogRouter.get('/en/blog/elimination-of-forest-fires', getResponse);
enBlogRouter.get('/en/blog/first-art-skate-park', getResponse);
enBlogRouter.get('/en/blog/course-completed', getResponse);
enBlogRouter.get('/en/blog/startup-attack', getResponse);
enBlogRouter.get('/en/blog/equator-passed', getResponse);
enBlogRouter.get('/en/blog/learn-with-involta', getResponse);
enBlogRouter.get('/en/blog/the-future-is-now', getResponse);
enBlogRouter.get('/en/blog/starting-a-course', getResponse);

export default enBlogRouter;