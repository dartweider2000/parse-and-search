import express from 'express';
import path from 'path';
import blogRouter from './route/blog.js';

const app = express();
const port = 3000;

app.set('views', path.resolve('views'));
app.use(express.urlencoded({'extended': false}));
app.use(express.static(path.resolve('public')))


app.use(blogRouter);

app.listen(port, () => {
   console.log('Server is started');
});


