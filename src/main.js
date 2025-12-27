#!/usr/bin/env node

import loadPages from "./core/load-pages.js";
import startDevServer from "./output/dev-server.js";
import exportJSON from "./output/json.js";
import config from "./user/config.js";
import fs from "fs";


const pages = loadPages(config.pagesDir);


switch (process.argv[2]) {
case "dev":
startDevServer(pages, config);
break;


case "json":
fs.writeFileSync("pages.json", JSON.stringify(exportJSON(pages), null, 2));
break;


default:
console.log("md-engine dev | json");
}