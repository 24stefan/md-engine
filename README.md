# md-engine



You write Markdown files. md-engine turns them into pages you can view in the browser, serve locally, or export as data. 

---



## Basic idea

```
pages/
├── index.md        → /
├── about.md        → /about
└── blog/
    └── first.md    → /blog/first ...bla..bla..
```

Each `.md` file becomes a page.
Folders become routes.

---

## Getting started

### Install

```bash
npm install md-engine
```

Or clone the repository and install dependencies:

```bash
npm install
```

---

## Create pages

Create a `pages/` folder in your project root.

Example:

```md
# Home

Welcome to my site.
```

Save this as:

```
pages/index.md
```

---

## Run the dev server

```bash
md-engine dev
```

or if running locally:

```bash
node src/main.js dev
```

Open:

```
http://localhost:3000
```

Pages are rendered at request time. No HTML files are written.

---

## Export content as JSON

```bash
md-engine json
```

This creates a `pages.json` file with all routes and markdown content.

This is useful if you want to:

* Use the content in a frontend framework
* Build a mobile app
* Treat md-engine as a headless content source

---

## Themes

md-engine includes several built-in themes.

Themes control colors, spacing, and typography.

You can change the theme in:

```
src/user/config.js
```

Example:

```js
export default {
  theme: "dark"
};
```

---

## What md-engine does not do

md-engine intentionally avoids:

* HTML templates
* Frameworks
* Databases
* CMS features
* Build pipelines

The goal is to keep the system simple and understandable.

---

## How it is structured

* Markdown files are loaded into Page objects
* Routes are derived from file paths
* Rendering happens internally
* Output is handled by adapters (dev server, JSON export, optional static build)

This makes the core easy to extend without changing how content is written.

---



## License

MIT
