import express from 'express';
import path from 'path';
import blogRouter from './route/blog.js';
import { getResponse, getSearch } from './helpres/http-get-response-helper.js';
import enRouter from './route/en.js';
import fs, {promises} from 'fs';
import { getData } from './fille-system-actions.js';
import { getPath } from './helpres/html-file-path-healper.js';

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

app.get('/search', getSearch);
app.get('/video', getSearch);
app.get('/images', getSearch);

app.listen(port, () => {
   console.log('Server is started');
});


