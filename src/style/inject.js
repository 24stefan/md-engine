import { themes } from "./styles_lib.js";

export function getThemeCSS(name) {
  const t = themes[name] || themes.dark;

  return `
:root {
  --bg: ${t.bg};
  --text: ${t.text};
  --link: ${t.link};
  --code-bg: ${t.codeBg};
  --heading: ${t.heading};
  --border: ${t.border};
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.65;
}

main {
  max-width: 72ch;
  padding: 2rem 1.25rem;
  margin: auto;
}

/* Typography */
h1, h2, h3, h4 {
  color: var(--heading);
  line-height: 1.25;
  margin-top: 2.5rem;
}

h1 { font-size: 2.2rem; }
h2 { font-size: 1.7rem; }
h3 { font-size: 1.3rem; }

p {
  margin: 1rem 0;
}

/* Links */
a {
  color: var(--link);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

/* Code */
pre {
  background: var(--code-bg);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  border: 1px solid var(--border);
}

code {
  background: var(--code-bg);
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

/* Lists */
ul, ol {
  padding-left: 1.25rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  main {
    padding: 1.5rem 1rem;
  }

  h1 { font-size: 1.8rem; }
  h2 { font-size: 1.4rem; }
  h3 { font-size: 1.15rem; }
}

@media (max-width: 480px) {
  main {
    padding: 1.25rem 0.75rem;
  }

  body {
    font-size: 0.95rem;
  }
}
`;
}
