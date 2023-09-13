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

const urlQueue = [baseUrl];

(async () => {
   const browser = await puppeteer.launch({'headless': 'new'});
   const page = await browser.newPage();

   let url;

   do{
      if(!urlQueue.length)
         return;

      url = urlQueue.shift();
   }while(urlSet.has(url));
   
   urlSet.add(url)

   await page.goto(url);
   const content = await page.content();

   let parthList = (url += '.html').replace(baseUrl, '').split('/');
   //console.log(parthList);
   //console.log(...(parthList.join('') === '.html' ? ['index.html'] : parthList));
   await writeData(path.resolve(htmlDir, ...(parthList.join('') === '.html' ? ['index.html'] : parthList)), content);

   const {staticHrefList, urlHrefList} = await page.evaluate(() => {
      let linkHrefList = [...document.querySelectorAll('link')].map(el => el.getAttribute('href'));

      let scriptSrcList = [...document.querySelectorAll('script[src]')].map(el => el.getAttribute('src'));
      let urlHrefList = [...document.querySelectorAll('a')].map(el => el.getAttribute('href')).filter(href => href[0] === '/');

      const staticHrefList = [...new Set([...linkHrefList, ...scriptSrcList])];
      urlHrefList = [...new Set(urlHrefList)]; 

      return {staticHrefList, urlHrefList};
   });

   console.log(staticHrefList);
   console.log(urlHrefList);

   await browser.close();
})()


// (async () => {
//    //открываю браузер
//    //const browser = await puppeteer.launch({'headless': 'new'});
//    //открываю новую страницу браузера
//    //const page = await browser.newPage();
//    //перехожу по данному адресу в созданной вкладке
//    //await page.goto('https://involtago.com/apple-touch-icon.png');
//    //Делаем скриншот, чтобы удостоверится, что всё сделано
//    //await page.screenshot({'path': './img/example.png'});

//    // const hrefList = await page.('link', el => el.getAttribute('href'));

//    // const hrefList = await page.evaluate(() => {
//    //    return [...document.querySelectorAll('link')].map(el => el.getAttribute('href'));
//    // });

//    //const content = await page.content();

//    //console.log(content);

//    const data = await fetch('https://involtago.com/apple-touch-icon.png').then(res => console.log(res));

//    console.log(data);

//    const buffer = Buffer.from(data, 'utf-8');

//    //console.log(buffer.toString('ascii'));

//    //await writeFile('./img/2.png', buffer);

//    const stream = fs.createWriteStream('./src/pic.html');

//    stream.write(buffer.toString());

//    console.log(buffer.toString());

//    https.get('https://involtago.com/apple-touch-icon.png', res => {
//       //console.log(res);
//       res.addListener('data', (chunk) => {
//          console.log(chunk.toString('utf-8'));

//          stream.write(chunk);
//       })
//       //res.pipe(stream);
//    });

//    //const stream = fs.createWriteStream('./img/1.webp');
   

//   // await writeFile(path.resolve('', 'img', `apple-touch-icon.png`), content);
//    // console.log(hrefList);

//    // const data = (await axios.get(`https://involtago.com${hrefList[2]}`)).data;

//    //const buffer = Buffer.from(data);
//    //page.get

//    //await writeFile(path.resolve('', 'img', `${hrefList[2].slice(1)}`), buffer);

//    //const content = await page.content();

//    //console.log(content);

//    //await writeFile(path.resolve('', 'src', 'index.html'), content);

//    //console.log(res);

//    //Закрываю браузер
//    //await browser.close();
// })()

const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

const items = [];

// (async () => {
//    const browser = await puppeteer.launch({'headless': 'new', 'defaultViewport': false});
//    const page = await browser.newPage();
//    await page.goto('https://www.ozon.ru/category/noutbuki-planshety-i-elektronnye-knigi-8730/?category_was_predicted=true&deny_category_prediction=true&from_global=true&text=ноутбуки');
//    await page.screenshot({'path': './img/example.png'});
  
//    //await wait(700);
//    const handleList = await page.$$('.ir6.i6r');

//    console.log(handleList);
//    //await handleList[0].screenshot({'path': `./img/0.png`})

//    //handleList.forEach(async (el, index) => await el.screenshot({'path': `./img/${index}.png`}));

//    //let i = 0;

//    for(const elHandle of handleList){
//       let src, title, price;

//       try{
//          // src = await elHandle.$eval('.ri6 .oi8>img', el => el.getAttribute('src'));
//          src = await page.evaluate(el => el.querySelector('.ri6 .oi8>img').getAttribute('src'), elHandle);
//       }catch{

//       }

//       try{
//          title = await elHandle.$eval('.r6i a.tile-hover-target span', el => el.textContent);
//       }catch{
         
//       }

//       try{
//          price = await elHandle.$eval('.ir7 .c3110-a0>*:first-child', el => el.textContent);
//       }catch{
         
//       }
//       // src = await elHandle.$eval('.ri6 img[loading="eager"]', el => el.getAttribute('src'));
//       // title = await elHandle.$eval('.r6i span', el => el.textContent);
//       // price = await elHandle.$eval('.ir7 .c3110-a0>*:first-child', el => el.textContent);
      
//       items.push({src, title, price});
//    }

//    await writeFile('./src/items.json', JSON.stringify(items, null, 1));
//    //console.log(blockList);

//    await browser.close();
// })()

// (async () => {
//    const browser = await puppeteer.launch({'headless': 'new'});
//    const page = await browser.newPage();
//    await page.goto(`${baseUrl}`);

//    const cssHrefList = await page.$$eval('link', linkList => linkList.map(link => link.getAttribute('href')).filter(href => href.endsWith('.css')));

//    console.log(cssHrefList);

//    const fileList = [];

//    for(const href of cssHrefList){
//       //await page.goto(`${baseUrl}${href}`);
//       //const file = await page.content();

//       https.get(`${baseUrl}${href}`, res => {
//          const fileName = href.split('/').pop();

//          const stream = fs.createWriteStream(`./src/${fileName}`);

//          res.addListener('data', chunk => {
//             stream.write(chunk);
//          });
//       });
      
//       //fileList.push(file);
//    }

//    //console.log(fileList);

//    await browser.close();
// })()

// (async () => {
//    console.log(path.resolve('src'));
// })()

