import { Router } from 'express';
import { getResponse } from '../helpres/http-get-response-helper.js';


const blogRouter = Router();


blogRouter.get('/blog', getResponse);

blogRouter.get('/blog/elimination-of-forest-fires', getResponse);

blogRouter.get('/blog/first-art-skate-park', (req, res) => {
   res.status(301).redirect('/blog');
});

blogRouter.get('/blog/course-completed', getResponse);

blogRouter.get('/blog/startup-attack', getResponse);

blogRouter.get('/blog/equator-passed', getResponse);

blogRouter.get('/blog/learn-with-involta', getResponse);

blogRouter.get('/blog/the-future-is-now', getResponse);

blogRouter.get('/blog/starting-a-course', getResponse);

export default blogRouter;