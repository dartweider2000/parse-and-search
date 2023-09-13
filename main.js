import puppeteer from "puppeteer";
import os from 'os'
import path from "path";
import { getDataAndWriteData, writeData } from "./fille-system-actions.js";


const baseUrl = 'https://involtago.com';
const htmlDir = 'views';
const staticDir = 'public';

//const urlMap = {
   // 'main': baseUrl,
   // 'help': `${baseUrl}/help`,
   // 'about': `${baseUrl}/about`,
   // 'blog': `${baseUrl}/blog`,
   // 'main-en': `${baseUrl}/en`,
   // 'help-en': `${baseUrl}/en/help`,
   // 'about-en': `${baseUrl}/en/about`,
   // 'blog-en': `${baseUrl}/en/blog`,
//}

const urlSet = new Set();
const staticSet = new Set();

const urlQueue = ['/'];

(async () => {
   const browser = await puppeteer.launch({'headless': 'new'});
   const page = await browser.newPage();

   let url;

   up: while(urlQueue.length){

      try{

      
         // console.log(urlQueue);
         // console.log(urlSet);

         do{
            if(!urlQueue.length)
               break up;

            url = urlQueue.shift();
         }while(urlSet.has(url));

         //console.log(url);
         
         urlSet.add(url)

         //console.log(`${baseUrl}${url}`);
         await page.goto(`${baseUrl}${url}`);
         //console.log('+++++++++++++');

         const content = await page.content();

         //console.log('******');

         let parthList = (url += '.html').replace(baseUrl, '').split('/');
         //console.log(parthList);
         //console.log(...(parthList.join('') === '.html' ? ['index.html'] : parthList));
         await writeData(path.resolve(htmlDir, ...(parthList.join('') === '.html' ? ['index.html'] : parthList)), content);

         const {staticHrefList, urlHrefList} = await page.evaluate(() => {
            let linkHrefList = [...document.querySelectorAll('link[href]')].map(el => el.getAttribute('href')).filter(href => href[0] === '/');

            let scriptSrcList = [...document.querySelectorAll('script[src]')].map(el => el.getAttribute('src')).filter(src => src[0] === '/');
            let urlHrefList = [...document.querySelectorAll('a[href]')].map(el => el.getAttribute('href')).filter(href => href[0] === '/');

            const staticHrefList = [...new Set([...linkHrefList, ...scriptSrcList])];
            urlHrefList = [...new Set(urlHrefList)]; 

            return {staticHrefList, urlHrefList};
         });

         //console.log('-------------------');

         // console.log(staticHrefList);
         // console.log(urlHrefList);

         //console.log(staticHrefList);

         for(const href of staticHrefList){
            //console.log(href);

            if(!staticSet.has(href)){
               await getDataAndWriteData(`${baseUrl}${href}`, path.resolve(staticDir, ...href.slice(1).split('/')));
               staticSet.add(href);

               //console.log('yes');
            }
            // else
            //    console.log('no');
         }

         urlQueue.push(...urlHrefList);
      }catch(err){
         console.log(err.message);
      }

      //console.log('end');

      //console.log('******');
   }

   await browser.close();
})()

