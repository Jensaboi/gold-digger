import http from "node:http";
import { serveStatic } from "./lib/serveStatic.js";
import { generateRandomGoldPrice } from "./lib/utility.js";
import { handlePost } from "./lib/routeHandlers.js";

const PORT = 8000;
const __dirname = import.meta.dirname;

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api")) {
    if (req.method === "GET" && req.url === "/api") {
      //handle get req
    } else if (req.method === "POST" && req.url === "/api") {
      //handle post req
      handlePost(req, res, __dirname);
    } else if (req.url === "/api/gold/live" && req.method === "GET") {
      //Stream gold price
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      setInterval(() => {
        res.write(
          `data: ${JSON.stringify({
            event: "Gold price",
            price: generateRandomGoldPrice(),
          })}\n\n`
        );
      }, 3000);
    }
  } else if (!req.url.startsWith("/api")) {
    return serveStatic(req, res, __dirname);
  }
});

server.listen(PORT, () => {
  console.log(`Server connected: Listening on port ${PORT}`);
});
