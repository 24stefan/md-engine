import fs from "fs";
import path from "path";
import Page from "./page.js";


export default function loadPages(pagesDir) {
const pages = [];


function walk(dir, base = "") {
for (const file of fs.readdirSync(dir)) {
const full = path.join(dir, file);
const rel = path.join(base, file);


if (fs.statSync(full).isDirectory()) {
walk(full, rel);
} else if (file.endsWith(".md")) {
const route = "/" + rel.replace(/index\.md$/, "")
.replace(/\.md$/, "")
.replace(/\\/g, "/");


const md = fs.readFileSync(full, "utf8");
const title = md.split("\n")[0].replace(/^#\s*/, "");


pages.push(new Page({ route, title, markdown: md }));
}
}
}


walk(pagesDir);
return pages;
}