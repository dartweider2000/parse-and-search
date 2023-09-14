import path from 'path';

const getPath = (url) => {
   url[url.length - 1] == '/' && (url = url.slice(0, url.length - 1));

   const filePath = url === '' ? ['index.html'] : (url += '.html').slice(1).split('/');
   //return url === '/' ? ['index.html'] : ((url += '.html').slice(1).split('/'));
   return path.resolve('views', ...filePath);
}

export { getPath };