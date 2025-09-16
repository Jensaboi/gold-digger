import path from "node:path";
import fs from "node:fs/promises";
import { getContentType } from "./utility.js";

export async function serveStatic(req, res, dirname) {
  const pathToResource = path.join(
    dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  try {
    const page = await fs.readFile(pathToResource);

    const ext = path.extname(pathToResource);

    const contentType = getContentType(ext);

    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(page);
  } catch (err) {
    const notFoundPath = path.join(dirname, "public", "404.html");
    const notFoundPage = await fs.readFile(notFoundPath);
    res.statusCode = 404;
    res.setHeader("Content-Type", "index.html");
    res.end(notFoundPage);
  }
}
