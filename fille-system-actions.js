import https from 'https';
import fs from 'fs';
import path from 'path';

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

const writeData = async (filePath, data) => {
   try{
      await fs.promises.stat(filePath);
   }catch(err){
      const dirPath = filePath.slice(0, filePath.lastIndexOf(path.sep));

      await fs.promises.mkdir(dirPath, {'recursive': true});
   }finally{
      await writeData(filePath, data);
   }
}

const getDataAndWriteData = async (url, filePath) => {
   const data = await getData(url);
   await writeData(filePath, data);
}

export { getDataAndWriteData };