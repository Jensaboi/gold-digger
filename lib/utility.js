export function getContentType(ext) {
  const hash = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".txt": "text/plain",
    ".pdf": "application/pdf",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".xml": "application/xml",
  };

  return hash[ext.toLowerCase()] || "application/octet-stream";
}

export function generateRandomGoldPrice() {
  const randomPrice = Math.ceil(Math.random() * 5000);

  return Math.min(randomPrice, 3127);
}
