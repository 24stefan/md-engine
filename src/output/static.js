import fs from "fs";
import path from "path";
import { renderMarkdown } from "../core/renderer.js";
import { getThemeCSS } from "../style/inject.js";


export default function buildStatic(pages, out, config) {
pages.forEach(p => {
const file = p.route === "/" ? "index.html" : p.route + "/index.html";
const full = path.join(out, file);


fs.mkdirSync(path.dirname(full), { recursive: true });


fs.writeFileSync(full, `<!doctype html>
<html><head><style>${getThemeCSS(config.theme)}</style></head>
<body>${renderMarkdown(p.markdown)}</body></html>`);
});
}