import puppeteer from "puppeteer";
import path from "path";
import {promises} from "fs";
import { findUrlFormString, getDataAndWriteData, isExist, writeData } from "./fille-system-actions.js";
import { getHtmlPath, getPathWidthoutQuery } from "./helpres/html-file-path-healper.js";


const baseUrl = 'https://involtago.com';
const htmlDir = 'views';
const staticDir = 'public';

const inputSelector = 'main form input#query';

const urlSet = new Set();
const staticSet = new Set();

const urlQueue = ['/'];//['/search?q=123'];

//Функция парсер

(async () => {
   const browser = await puppeteer.launch({'headless': 'new'});
   const page = await browser.newPage();

   let url;

   //цикл обхода html страниц

   up: while(urlQueue.length){

      try{

         //проверяю на то исследовал ли я уже эту страницу

         do{
            if(!urlQueue.length)
               break up;

            url = urlQueue.shift();
         }while(urlSet.has(url));
         
         urlSet.add(url)
        
         // if(await isExist(getHtmlPath(url)))
         //    continue;

         //перехожу на страницу
         await page.goto(`${baseUrl}${url}`);
         let content = await page.content();

         //let search = false;

         //блок, в котором дополнительно обрабатываются запросы

         if(url.lastIndexOf('?') != -1){
            const inputRegExp = /<input[\d\D]*?>/ig;
            const rootRegExp = /<div id="__next" data-reactroot="">[\d\D]*<\/div>/ig;
            const queryRegExp = /{\s*"q"\s*:\s*"[\d\D]*?"\s*}/ig;

            let root = content.match(rootRegExp)[0];

            content = content.replace(rootRegExp, root + '<div class="gcse-search"></div>');
            content = content.replace(/<\/body>/ig, `
               <script src="https://cse.google.com/cse.js?cx=c2d33ea0d202b48fc"></script>
               <script src="/my/google-custom-search.js"></script>
               </body>
            `);
            content = content.replace(/<\/head>/ig, '<link rel="stylesheet" href="/my/google-custom-search.css"/></head>');
            content = content.replace(queryRegExp, JSON.stringify({q: ''}));

            content = content.replace(inputRegExp, '<input name="query" id="query" class="search-form_input__f9sim" autocomplete="off" placeholder=" " value="">');
         }




         //загрузка блока

         await writeData(getHtmlPath(url), content);

         //поиск ссылок на статические ресурсы

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

         //цикл загрузки статических ресурсов

         while(staticHrefList.length){  
            const source = staticHrefList.pop();

            if(!staticSet.has(source)){
               const statilList = await getDataAndWriteData(`${baseUrl}${source}`, path.resolve(staticDir, ...source.slice(1).split('/')));
               staticSet.add(source);

               staticHrefList.push(...statilList);
            }
         }

         //добавляю в очереть ссылки на html документы

         urlQueue.push(...urlHrefList);

         const isHere = !!(await page.$(inputSelector));

         //если это гравный экран с поиском, то ввожу данные и перехожу на страницу с поиском

         if(isHere){
            await page.type(inputSelector, '123');
            await page.keyboard.press('Enter'); 

            await page.waitForNavigation();

            const hrefList = await page.evaluate(() => {
               return [...document.querySelectorAll('header nav ul li a[href].navigation_link__MPiS5')].map(el => el.getAttribute('href'));
            });
         
            urlQueue.push(...hrefList);
         }

      }catch(err){
         console.log(err.message);
      }

   }

   await browser.close();
})()

