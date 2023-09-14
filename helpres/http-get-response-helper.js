import { getPath } from "./html-file-path-healper.js";

const getResponse = (req, res) => {
   res.status(200).sendFile(getPath(req.url));
}

export { getResponse };