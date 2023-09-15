import https from 'https';
import fs from 'fs';
import path from 'path';

//функция получает данные с сервера

const getData = async (url) => {
   return new Promise((resolve, reject) => {
      let data = Buffer.from('');

      https.get(url, res => {

         res.addListener('end', () => {
            resolve(data);
         });

         res.addListener('data', chunk => {
            data = Buffer.concat([data, chunk]);
         });

         res.addListener('error', err => {
            reject(err);
         });

      });
   });
}

//функция записи данных в файл, если данный файл уже есть, то он не перезаписывается, если папки нет, то она создаётся.

const writeData = async (filePath, data, search = false) => {
   try{
      await fs.promises.stat(filePath);
   }catch(err){
      const dirPath = filePath.slice(0, filePath.lastIndexOf(path.sep));

      await fs.promises.mkdir(dirPath, {'recursive': true});
      await fs.promises.writeFile(filePath, data);
   }finally{
      if(search){
         const dirPath = filePath.slice(0, filePath.lastIndexOf(path.sep));

         await fs.promises.mkdir(dirPath, {'recursive': true});
         await fs.promises.writeFile(filePath, data);
      }
   }
}

//функция находит подключения статических файлов в фалаз .css, .js и.т.д

const findUrlFormString = (data, type = 'css') => {
   const str = data.toString();
   let list = [];

   const callback = el => el.slice(el.indexOf('/'), [...el].findLastIndex(char => !/[\'\"\)]/ig.test(char)) + 1);

   if(type == 'css')
      list = str.match(/url\([\'\"]?[\d\w\/\-\.]+[\'\"]?\)/gi)?.map(callback);
   else
      list = str.match(/[\"\']\/[\d\w\/\-]+\.[\d\w]{1,8}[\"\']/ig)?.map(callback);

   return list;
}

//функция получает данные и записывает их

const getDataAndWriteData = async (url, filePath) => {
   const data = await getData(url);
   let staticList = [];
   const ext = ['png', 'jpg', 'webp'];

   if(url.endsWith('.css')){
      staticList = findUrlFormString(data);
   }else if(ext.every(ex => !url.endsWith(ex))){
      staticList = findUrlFormString(data, 1);
   }

   await writeData(filePath, data);

   return staticList || [];
}

export { getDataAndWriteData, writeData, findUrlFormString, getData };