import { Router } from 'express';
import { getPath } from '../helpres/html-file-path-healper.js';
import path from 'path'

const blogRouter = Router();

const getResponse = (req, res) => {
   res.status(200).sendFile(getPath(req.url));
}

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