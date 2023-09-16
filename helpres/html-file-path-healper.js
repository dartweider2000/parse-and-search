import path from 'path';

const getPathWidthoutQuery = (url) => {
   return url.slice(0, url.lastIndexOf('?')); 
}

//функция конвертируе url запроса в путь до файла.

const getHtmlPath = (url) => {
   if(url.lastIndexOf('?') != -1){
      url = getPathWidthoutQuery(url);
   }

   url[url.length - 1] == '/' && (url = url.slice(0, url.length - 1));
   url[0] == '/' && (url = url.slice(1, url.length));

   const filePath = [...url.split('/'), 'index.html'];

   return path.resolve('views', ...filePath);
}

export { getHtmlPath, getPathWidthoutQuery };