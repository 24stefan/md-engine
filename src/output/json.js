export default function exportJSON(pages) {
return pages.map(p => ({
route: p.route,
title: p.title,
markdown: p.markdown
}));
}