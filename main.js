import puppeteer from "puppeteer";
import os from 'os'
import path from "path";
import { findUrlFormString, getDataAndWriteData, writeData } from "./fille-system-actions.js";


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

const urlQueue = ['/blog/starting-a-course'];//['/'];

(async () => {
   const browser = await puppeteer.launch({'headless': 'new'});
   const page = await browser.newPage();

   let url;

   //up: while(urlQueue.length){

      try{

      
         // console.log(urlQueue);
         // console.log(urlSet);

         do{
            if(!urlQueue.length)
               break;//break up;

            url = urlQueue.shift();
         }while(urlSet.has(url));

         //console.log(url);
         
         urlSet.add(url)

         // if(url == '/blog/first-art-skate-park')
         //    throw new Error('wait for a long');

         //console.log(`${baseUrl}${url}`);
         await page.goto(`${baseUrl}${url}`);
         //console.log('+++++++++++++');

         const content = await page.content();

         //console.log('******');

         let parthList = (url += '.html').replace(baseUrl, '').split('/');
         //console.log(parthList);
         //console.log(...(parthList.join('') === '.html' ? ['index.html'] : parthList));
         await writeData(path.resolve(htmlDir, ...(parthList.join('') === '.html' ? ['index.html'] : parthList)), content);

         const {staticHrefList, urlHrefList, imgSwiperList} = await page.evaluate(() => {
            //let linkHrefList = [...document.querySelectorAll('link[href]')].map(el => el.getAttribute('href')).filter(href => href[0] === '/');
            let staticSourceList = [
               ...document.querySelectorAll('img[src]'),
               ...document.querySelectorAll('link[href]'),
               ...document.querySelectorAll('script[src]'),
               ...document.querySelectorAll('video[src]'),
               //...document.querySelectorAll('video[poster]'),
               ...document.querySelectorAll('picture>source[srcset]'),
            ].map(el => el.getAttribute('srcset') || el.getAttribute('href') || [el.getAttribute('src'), el.getAttribute('poster')]).flat(Infinity).filter(source => source && source[0] === '/');
            //let scriptSrcList = [...document.querySelectorAll('script[src]')].map(el => el.getAttribute('src')).filter(src => src[0] === '/');
            let urlHrefList = [...document.querySelectorAll('a[href]')].map(el => el.getAttribute('href')).filter(href => href[0] === '/');
            let imgSwiperList = [...document.querySelectorAll('.swiper-container>.swiper-wrapper>*')].map(el => el.style.backgroundImage);

            //imgSwiperList = document.querySelectorAll('.swiper-container>.swiper-wrapper>*').map(el => el.style.backgroundImage);

            // if(document.querySelector('.swiper-container>.swiper-wrapper')){
            //    const wrapperList = [...document.querySelectorAll('.swiper-wrapper')];

            //    wrapperList.forEach(wrap => {
            //       const childList = [...wrap.children];

            //       imgSwiperList.push(...childList.map(el => el.style.backgroundImage));
            //    });
            // }

            const staticHrefList = [...new Set([...staticSourceList])];
            urlHrefList = [...new Set(urlHrefList)]; 

            return {staticHrefList, urlHrefList, imgSwiperList};
         });

         //console.log(imgSwiperList, 'list');
         imgSwiperList.length && staticHrefList.push(
            ...new Set(imgSwiperList.map(str => findUrlFormString(str).pop()))
         );

         // console.log(staticHrefList);
         // console.log(urlHrefList);

         //console.log(staticHrefList);

         const getAndSet = async (source) => {
            const statilList = await getDataAndWriteData(`${baseUrl}${source}`, path.resolve(staticDir, ...source.slice(1).split('/')));
            staticSet.add(source);

            return statilList;
         }

         //console.log(staticHrefList);

         while(staticHrefList.length){
            try{
               const source = staticHrefList.pop();

               if(!staticSet.has(source)){
                  const statilList = await getDataAndWriteData(`${baseUrl}${source}`, path.resolve(staticDir, ...source.slice(1).split('/')));
                  staticSet.add(source);

                  staticHrefList.push(...statilList);
               }
            }catch(err){
               console.log(err.message);
            }
         }

         // for(const href of staticHrefList){
         //    //console.log(href);

         //    if(!staticSet.has(href)){
         //       // const staticUrlList = await getDataAndWriteData(`${baseUrl}${href}`, path.resolve(staticDir, ...href.slice(1).split('/')));
         //       // staticSet.add(href);
         //       const staticUrlList = await getAndSet(href);

         //       //console.log(staticUrlList);

         //       for(const url of staticUrlList){
         //          // await getDataAndWriteData(`${baseUrl}${url}`, path.resolve(staticDir, ...href.slice(1).split('/')));
         //          // staticSet.add(href)

         //          await getAndSet(url);
         //       }
         //       //console.log('yes');
         //    }
         //    // else
         //    //    console.log('no');
         // }

         urlQueue.push(...urlHrefList);
      }catch(err){
         console.log(err.message);
      }

      //console.log('end');

      //console.log('******');
   //}

   await browser.close();
})()

