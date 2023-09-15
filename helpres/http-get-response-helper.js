import { getPath } from "./html-file-path-healper.js";
import {promises} from 'fs';

const getResponse = (req, res) => {
   res.status(200).sendFile(getPath(req.url));
}

const getSearch = async (req, res) => {
   console.log(req.url);

   let oldHtml = (await promises.readFile(getPath(req.url))).toString();
   const regExp = /<script id="__NEXT_DATA__" type="application\/json">[\s\S]+?<\/script>/ig;

   const newProps = oldHtml.match(regExp)[0].replace(/{\s*"q"\s*:\s*"[\d\D]*?"\s*}/ig, JSON.stringify({q: req.query.q}));
   oldHtml = oldHtml.replace(regExp, newProps);

   res.status(200).send(oldHtml);
}

export { getResponse, getSearch };