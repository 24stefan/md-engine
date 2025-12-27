import { marked } from "marked";


export function renderMarkdown(md) {
return marked.parse(md);
}