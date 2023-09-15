import path from 'path';

//функция конвертируе url запроса в путь до файла.

const getPath = (url) => {
   if(url.lastIndexOf('?') != -1){
      url = url.slice(0, url.lastIndexOf('?'));
   }

   url[url.length - 1] == '/' && (url = url.slice(0, url.length - 1));
   const filePath = url === '' ? ['index.html'] : (url += '.html').slice(1).split('/');
   
   return path.resolve('views', ...filePath);
}

export { getPath };