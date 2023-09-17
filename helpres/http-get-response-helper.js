import { getHtmlPath } from "./html-file-path-healper.js";
import {promises} from 'fs';

//возвращает html для обычной html страницы

const getResponse = (req, res) => {
   res.status(200).sendFile(getHtmlPath(req.url));
}

//возвращает html для сраниц поиска

const getSearch = async (req, res) => {
   console.log(req.url);

   let oldHtml = (await promises.readFile(getHtmlPath(req.url))).toString();
   const regExp = /<script id="__NEXT_DATA__" type="application\/json">[\s\S]+?<\/script>/ig;

   const newProps = oldHtml.match(regExp)[0].replace(/{\s*"q"\s*:\s*"[\d\D]*?"\s*}/ig, JSON.stringify({q: req.query.q}));
   oldHtml = oldHtml.replace(regExp, newProps);

   res.status(200).send(oldHtml);
}

export { getResponse, getSearch };