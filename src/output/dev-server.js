import http from "http";
import { renderMarkdown } from "../core/renderer.js";
import { getThemeCSS } from "../style/inject.js";


export default function startDevServer(pages, config) {
const server = http.createServer((req, res) => {
const page = pages.find(p => p.route === req.url);


if (!page) {
res.writeHead(404);
return res.end("Not found");
}


const html = renderMarkdown(page.markdown);


res.writeHead(200, { "Content-Type": "text/html" });
res.end(`<!doctype html>
<html>
<head>
<title>${page.title}</title>
<style>${getThemeCSS(config.theme)}</style>
</head>
<body>
<main>${html}</main>
</body>
</html>`);
});


server.listen(3000);
console.log("✔ Dev server running at http://localhost:3000");
}