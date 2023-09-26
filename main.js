import puppeteer from "puppeteer";
import path from "path";
import fs, {promises} from "fs";
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

//console.log(fs.readdirSync('views'));

const filePathList = [];

const fileRegExp = /[^\.]+?\.[^\.]+?/ig;
const cssJsHtmlRegExp = /[^\.]+?\.(css|js|html)$/ig;

const look = (dirPath) => {

   //console.log(dirPath);

   const dirContentList = fs.readdirSync(dirPath);

   const {dirList, fileList} = dirContentList.reduce((res, value) => {

      // if(value.endsWith('.html'))
      //    res.fileList.push(value);
      // else
      //    res.dirList.push(value);
      // const isTrue = fileRegExp.test(value);
      // console.log(isTrue, value);
      
      if(value.match(cssJsHtmlRegExp)?.[0]){
         res.fileList.push(value);
         //console.log('!!!!');
      }else if(!value.match(fileRegExp)?.[0]){
         res.dirList.push(value);
         //console.log('-----');
      }
      return res;
   }, {'fileList': [], 'dirList': []});

   fileList.forEach(fileName => filePathList.push(path.resolve(dirPath, fileName)));

   // console.log(dirList);
   // console.log(fileList);
   dirList.forEach(dirName => look(path.resolve(dirPath, dirName)));
}

look(path.resolve('public'));



//console.log(filePathList);

filePathList.forEach(filePath => {
   const mainRegExp = /<script src="\/_next\/static\/chunks\/main-17e44cbdb5d5a0ca\.js" defer=""><\/script>/ig;
   const appRegExp = /<script src="\/_next\/static\/chunks\/pages\/_app-7bb6551620325462\.js" defer=""><\/script>/ig;

   const footerRegExp = /<div class="footer_block__tnIrs"><h2 class="footer_title__q0weN">Мобильное приложение<\/h2><a class="footer_app__HwCOE" target="_blank" href="https:\/\/apps\.apple\.com\/ru\/app\/involtago\/id1531286310" rel="noreferrer"><img src="\/images\/app-market-icons\/ru-app-store-icon\.png" alt="App Store"><\/a><a class="footer_app__HwCOE" target="_blank" href="https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.involta\.involtago&amp;hl=ru&amp;gl=US" rel="noreferrer"><img src="\/images\/app-market-icons\/ru-google-play-icon\.png" alt="Google Play"><\/a><a class="footer_app__HwCOE" target="_blank" href="https:\/\/appgallery\.huawei\.com\/#\/app\/C104055821\?sharePrepath=ag&amp;locale=ru_RU&amp;source=appshare&amp;subsource=C104055821" rel="noreferrer"><img src="\/images\/app-market-icons\/ru-app-gallery-icon\.png" alt="App Gallery"><\/a><\/div>/ig

   const footer_2RegExp = /<div class="footer_block__tnIrs"><h2 class="footer_title__q0weN">Mobile app<\/h2><a class="footer_app__HwCOE" target="_blank" href="https:\/\/apps\.apple.com\/ru\/app\/involtago\/id1531286310" rel="noreferrer"><img src="\/images\/app-market-icons\/en-app-store-icon\.png" alt="App Store"><\/a><a class="footer_app__HwCOE" target="_blank" href="https:\/\/play.google\.com\/store\/apps\/details\?id=com\.involta\.involtago&amp;hl=ru&amp;gl=US" rel="noreferrer"><img src="\/images\/app-market-icons\/en-google-play-icon.png" alt="Google Play"><\/a><a class="footer_app__HwCOE" target="_blank" href="https:\/\/appgallery\.huawei\.com\/#\/app\/C104055821\?sharePrepath=ag&amp;locale=ru_RU&amp;source=appshare&amp;subsource=C104055821" rel="noreferrer"><img src="\/images\/app-market-icons\/en-app-gallery-icon\.png" alt="App Gallery"><\/a><\/div>/ig;
   const footer_3RegExp = /<div class="footer__col footer__col-mobile">[\d\D]*?<h2 class="footer__title">Mobile App<\/h2>[\d\D]*?<a href="https:\/\/apps.apple.com\/ru\/app\/involtago\/id1531286310" class="icon__link">[\d\D]*?<img src="\/static\/Appstore-en.svg" alt="AppStore" class="app__logo">[\d\D]*?<\/a>[\d\D]*?<a href="https:\/\/play.google.com\/store\/apps\/details\?id=com\.involta\.involtago&amp;hl=ru&amp;gl=US" class="icon__link">[\d\D]*?<img src="\/static\/googlePlay-en\.svg" alt="googlePlay" class="app__logo"><\/a>[\d\D]*?<a href="https:\/\/appgallery\.huawei\.com\/#\/app\/C104055821\?sharePrepath=ag&amp;locale=ru_RU&amp;source=appshare&amp;subsource=C104055821" class="icon__link">[\d\D]*?<img src="\/static\/huawei-en\.svg" alt="Huawei" class="app__logo">[\d\D]*?<\/a>[\d\D]*?<\/div>/ig;
  
   const htmlLink = /href="\/[^\.]*?"/ig;

   const otherLink = /\/images\/[^.]*?\.[^.]+?("|'|&|\))/ig;

   let file = fs.readFileSync(filePath).toString();

   // file = file.replace(htmlLink, (match) => {
   //    let path = match.slice(6, match.lastIndexOf('"'));

   //    if(path.includes('?'))
   //       path = path.slice(0, path.lastIndexOf('?'));

   //    path = `/views${path}${path.length == 1 ? '' : '/'}index.html`;

   //    console.log(path);
   //    return path;
   // });

   file = file.replace(otherLink, (match) => {
      let path = match.slice(7, match.length - 1);

      // if(path.includes('?'))
      //    path = path.slice(0, path.lastIndexOf('?'));

      //path = `/views${path}${path.length == 1 ? '' : '/'}index.html`;

      console.log(path);
      return path;
   });

   //file = file.replace(mainRegExp, '');
   //file = file.replace(/<\/head>/ig, '<script src="/_next/static/chunks/main-17e44cbdb5d5a0ca.js" defer=""></script></head>');
   //file = file.replace(/<\/head>/ig, '<script src="/_next/static/chunks/pages/_app-7bb6551620325462.js" defer=""></script></head>');
   //file = file.replace(footer_3RegExp, '');

   //fs.writeFileSync(filePath, file);
});



// (async () => {
//    const browser = await puppeteer.launch({'headless': 'new'});
//    const page = await browser.newPage();

//    let url;

//    //цикл обхода html страниц

//    up: while(urlQueue.length){

//       try{

//          //проверяю на то исследовал ли я уже эту страницу

//          do{
//             if(!urlQueue.length)
//                break up;

//             url = urlQueue.shift();
//          }while(urlSet.has(url));
         
//          urlSet.add(url)
        
//          if(await isExist(getHtmlPath(url)))
//             continue;

//          //перехожу на страницу
//          await page.goto(`${baseUrl}${url}`);
//          let content = await page.content();

//          //let search = false;

//          //блок, в котором дополнительно обрабатываются запросы

//          //if(url.lastIndexOf('?') != -1){
//             //const inputRegExp = /<input[\d\D]*?>/ig;
//             const rootRegExp = /<div id="__next" data-reactroot="">[\d\D]*<\/div>/ig;
//             //const queryRegExp = /{\s*"q"\s*:\s*"[\d\D]*?"\s*}/ig;
//             //const queryRegExp = /"query"\s*:\s*{\s*[\d\D]*?\s*}/ig;

//             try{
//                let root = content.match(rootRegExp)[0];
//                content = content.replace(rootRegExp, root + '<div class="gcse-search"></div>');
//             }catch{
//                content = content.replace(/<body>/ig, '<body><div class="gcse-search"></div>');
//             }
//             //let root = content.match(rootRegExp)[0];

//             //?#gsc.tab=${0}&gsc.q=${input.value}&gsc.page=5`);

//             //content = content.replace(rootRegExp, root + '<div class="gcse-search"></div>');
//             content = content.replace(/<\/body>/ig, `
//                <script src="https://cse.google.com/cse.js?cx=c2d33ea0d202b48fc"></script>
//                <script src="/my/google-custom-search.js"></script>
//                </body>
//             `);
//             content = content.replace(/<\/head>/ig, '<link rel="stylesheet" href="/my/google-custom-search.css"/></head>');
//             // content = content.replace(queryRegExp, JSON.stringify({'#gsc.tab': '', 'gsc.q': '', 'gsc.page': ''}));
//             //content = content.replace(queryRegExp, `"query":${JSON.stringify({'#gsc.q': '', '#gsc.tab': '', 'gsc.page': ''})}`);

//             if(url.lastIndexOf('?') != -1){
//                // const queryRegExp = /"query"\s*:\s*{\s*[\d\D]*?\s*}/ig;
//                // content = content.replace(queryRegExp, `"query":${JSON.stringify({'#gsc.q': '', '#gsc.tab': '', 'gsc.page': ''})}`);

//                const queryRegExp = /"query"\s*:\s*{\s*[\d\D]*?\s*}/ig;
//                content = content.replace(queryRegExp, `"query":${JSON.stringify({'#gsc.q': ''})}`);
//             }

//             //content = content.replace(inputRegExp, '<input name="query" id="query" class="search-form_input__f9sim" autocomplete="off" placeholder=" " value="">');
//          //}




//          //загрузка блока

//          await writeData(getHtmlPath(url), content);

//          //поиск ссылок на статические ресурсы

//          const {staticHrefList, urlHrefList, imgSwiperList} = await page.evaluate(() => {
//             let staticSourceList = [
//                ...document.querySelectorAll('img[src]'),
//                ...document.querySelectorAll('link[href]'),
//                ...document.querySelectorAll('script[src]'),
//                ...document.querySelectorAll('video[src]'),
//                ...document.querySelectorAll('picture>source[srcset]'),
//             ].map(el => el.getAttribute('srcset') || el.getAttribute('href') || [el.getAttribute('src'), el.getAttribute('poster')]).flat(Infinity).filter(source => source && source[0] === '/');
            
//             let urlHrefList = [...document.querySelectorAll('a[href]')].map(el => el.getAttribute('href')).filter(href => href[0] === '/');
//             let imgSwiperList = [...document.querySelectorAll('.swiper-container>.swiper-wrapper>*')].map(el => el.style.backgroundImage);

//             const staticHrefList = [...new Set([...staticSourceList])];
//             urlHrefList = [...new Set(urlHrefList)]; 

//             return {staticHrefList, urlHrefList, imgSwiperList};
//          });

//          imgSwiperList.length && staticHrefList.push(
//             ...new Set(imgSwiperList.map(str => findUrlFormString(str).pop()))
//          );

//          //цикл загрузки статических ресурсов

//          while(staticHrefList.length){  
//             const source = staticHrefList.pop();

//             if(!staticSet.has(source)){
//                const statilList = await getDataAndWriteData(`${baseUrl}${source}`, path.resolve(staticDir, ...source.slice(1).split('/')));
//                staticSet.add(source);

//                staticHrefList.push(...statilList);
//             }
//          }

//          //добавляю в очереть ссылки на html документы

//          urlQueue.push(...urlHrefList);

//          const isHere = !!(await page.$(inputSelector));

//          //если это гравный экран с поиском, то ввожу данные и перехожу на страницу с поиском

//          if(isHere){
//             await page.type(inputSelector, '123');
//             await page.keyboard.press('Enter'); 

//             await page.waitForNavigation();

//             const hrefList = await page.evaluate(() => {
//                return [...document.querySelectorAll('header nav ul li a[href].navigation_link__MPiS5')].map(el => el.getAttribute('href'));
//             });
         
//             urlQueue.push(...hrefList);
//          }

//       }catch(err){
//          console.log(err.message);
//       }

//    }

//    await browser.close();
// })()

