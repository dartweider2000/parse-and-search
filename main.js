import puppeteer from "puppeteer";
import os from 'os'
import path from "path";
import fs, {promises} from "fs";
import { findUrlFormString, getDataAndWriteData, writeData } from "./fille-system-actions.js";
import { getPath } from "./helpres/html-file-path-healper.js";


const baseUrl = 'https://involtago.com';
const htmlDir = 'views';
const staticDir = 'public';

const inputSelector = 'main form input#query';

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

const urlQueue = ['/'];//['/en/search/?q=123'];

(async () => {
   const browser = await puppeteer.launch({'headless': 'new'});
   const page = await browser.newPage();

   let url;

   up: while(urlQueue.length){

      try{

         //console.log(urlQueue);

         do{
            if(!urlQueue.length)
               break up;

            url = urlQueue.shift();
         }while(urlSet.has(url));
         
         urlSet.add(url)
        
         await page.goto(`${baseUrl}${url}`);
         let content = await page.content();

         let is = false;

         if(url.lastIndexOf('?') != -1){
            url = url.slice(0, url.lastIndexOf('?'));

            is = true;

            const regExp = /<div id="__next" data-reactroot="">[\d\D]*<\/div>/ig;
            let root = content.match(regExp)[0];

            content = content.replace(regExp, root + '<div class="gcse-searchresults-only"></div>');
            content = content.replace(/<\/body>/ig, `
               <script src="https://cse.google.com/cse.js?cx=c2d33ea0d202b48fc"></script>
               <script src="/my/google-custom-search.js"></script>
               </body>
            `);
            content = content.replace(/<\/head>/ig, '<link rel="stylesheet" href="/my/google-custom-search.css"/></head>');
            content = content.replace(/{\s*"q"\s*:\s*"[\d\D]*?"\s*}/ig, JSON.stringify({q: ''}));
         }

         let parthList = (url += '.html').split('/');
         await writeData(path.resolve(htmlDir, ...(parthList.join('') === '.html' ? ['index.html'] : parthList)), content);

         if(is){
            let str = (await promises.readFile(getPath(url.slice(0, url.length - 5)))).toString();
            const inputRegExp = /<input[\d\D]*?>/ig;
            str = str.replace(inputRegExp, '<input name="query" id="query" class="search-form_input__f9sim" autocomplete="off" placeholder=" " value="">');
         
            //console.log(str);

            let parthList = url.split('/');
            console.log(parthList);
            await writeData(path.resolve(htmlDir, ...(parthList.join('') === '.html' ? ['index.html'] : parthList)), str, true);
         }

         const {staticHrefList, urlHrefList, imgSwiperList} = await page.evaluate(() => {
            let staticSourceList = [
               ...document.querySelectorAll('img[src]'),
               ...document.querySelectorAll('link[href]'),
               ...document.querySelectorAll('script[src]'),
               ...document.querySelectorAll('video[src]'),
               ...document.querySelectorAll('picture>source[srcset]'),
            ].map(el => el.getAttribute('srcset') || el.getAttribute('href') || [el.getAttribute('src'), el.getAttribute('poster')]).flat(Infinity).filter(source => source && source[0] === '/');
            
            let urlHrefList = [...document.querySelectorAll('a[href]')].map(el => el.getAttribute('href')).filter(href => href[0] === '/');
            let imgSwiperList = [...document.querySelectorAll('.swiper-container>.swiper-wrapper>*')].map(el => el.style.backgroundImage);

            const staticHrefList = [...new Set([...staticSourceList])];
            urlHrefList = [...new Set(urlHrefList)]; 

            return {staticHrefList, urlHrefList, imgSwiperList};
         });

         imgSwiperList.length && staticHrefList.push(
            ...new Set(imgSwiperList.map(str => findUrlFormString(str).pop()))
         );

         //console.log(urlHrefList);

         // const getAndSet = async (source) => {
         //    const statilList = await getDataAndWriteData(`${baseUrl}${source}`, path.resolve(staticDir, ...source.slice(1).split('/')));
         //    staticSet.add(source);

         //    return statilList;
         // }

         while(staticHrefList.length){  
            const source = staticHrefList.pop();

            if(!staticSet.has(source)){
               const statilList = await getDataAndWriteData(`${baseUrl}${source}`, path.resolve(staticDir, ...source.slice(1).split('/')));
               staticSet.add(source);

               staticHrefList.push(...statilList);
            }
         }

         urlQueue.push(...urlHrefList);

         const isHere = !!(await page.$(inputSelector));

         if(isHere){
            await page.type(inputSelector, '123');
            await page.keyboard.press('Enter'); 

            await page.waitForNavigation();

            const hrefList = await page.evaluate(() => {
               return [...document.querySelectorAll('header nav ul li a[href].navigation_link__MPiS5')].map(el => el.getAttribute('href'));
            });
           
            // let url = page.url().replace(baseUrl, '');
            // url = url.slice(0, url.lastIndexOf('?'));

            //console.log(hrefList);

            urlQueue.push(...hrefList);
         }

      }catch(err){
         console.log(err.message);
      }

   }

   await browser.close();
})()

