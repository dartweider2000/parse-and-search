import express from 'express';
import path from 'path';
import blogRouter from './route/blog.js';
import { getResponse } from './helpres/http-get-response-helper.js';
import enRouter from './route/en.js';

const app = express();
const port = 3000;

app.set('views', path.resolve('views'));
app.use(express.urlencoded({'extended': false}));
app.use(express.static(path.resolve('public')))


app.use(blogRouter);
app.use(enRouter);

app.get('/', getResponse);
app.get('/help', getResponse);
app.get('/about', getResponse);

app.listen(port, () => {
   console.log('Server is started');
});


