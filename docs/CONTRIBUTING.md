

## MD-ENGINE

md-engine is designed as a **Markdown-first content engine**, not a static site generator.






```
Markdown Files
     ↓
Page Objects (route + markdown)
     ↓
Internal Render Layer 
     ↓
Output Adapters
  ├─ Dev Server (runtime)
  ├─ JSON Export (headless)
  └─ Static Build 
```



---

## Directory Layout

```
md-engine/
├── pages/          
├── dist/           # generated optupt
│
├── src/
│   ├── main.js     # CLI entry point
│   │
│   ├── core/       # 
│   │   ├── page.js
│   │   ├── load-pages.js
│   │   ├── renderer.js
│   │   └── router.js (implicit via routes)
│   │
│   ├── output/     # Output adapters
│   │   ├── dev-server.js
│   │   ├── json.js
│   │   └── static.js
│   │
│   ├── style/      # Theme system
│   │   ├── styles_lib.js
│   │   └── inject.js
│   │
│   └── user/       # User configuration surface
│       └── config.js
│
└── docs/
```

Each folder maps to a **single responsibility**.

---

## Page Model

### `src/core/page.js`

A `Page` represents a unit of content.

It contains:

* `route` – resolved URL path (e.g. `/about`)
* `title` – extracted from markdown
* `markdown` – raw, unmodified content





---

## Markdown Loading & Routing

### `src/core/load-pages.js`

Responsibilities:

* Walk the `pages/` directory recursively
* Read `.md` files
* Convert file paths into URL routes

Routing rules:

* `index.md` → `/`
* `about.md` → `/about`
* `blog/post.md` → `/blog/post`

Routes are derived from the filesystem, not configured manually.

---

## Rendering Layer (Internal)

### `src/core/renderer.js`

* Converts Markdown → HTML
* Uses a markdown parser (`marked`)
* Produces **HTML strings only in memory**

The renderer is intentionally simple and isolated so it can be:

* Replaced
* Extended
* Wrapped by plugins later

---

## Styling System

### Theme Definitions – `src/style/styles_lib.js`

Themes are defined as **plain JavaScript objects**, not CSS files.





---

### Style Injection – `src/style/inject.js`

Responsibilities:

* Convert theme objects into CSS strings
* Inject CSS into rendered output

This allows:

* Zero external CSS files
* Fully self-contained pages
* Easy theming without build tools

---

## Output Adapters

Output adapters define **how content leaves the engine**.

Each adapter consumes the same `Page[]` structure.

---

### Dev Server – `src/output/dev-server.js`

* Starts a Node HTTP server
* Matches incoming requests to page routes
* Renders markdown **at request time**

Characteristics:

* No HTML written to disk
* HTML exists only during the request lifecycle
* Ideal for development and previews

---

### JSON Export – `src/output/json.js`

Exports content as structured JSON:

```
{
  route,
  title,
  markdown
}
```

Use cases:

* SPAs
* Mobile apps
* APIs
* Headless CMS scenarios

This mode treats md-engine as a **content provider**, not a site builder.

---

### Static Build (Optional) – `src/output/static.js`

* Converts pages into HTML files
* Writes them to disk
* Uses internal renderer + styles

HTML produced here is:

* Generated
* Disposable
* Never edited by users

This mode exists for compatibility, not as the primary workflow.

---

## CLI Layer

### `src/main.js`

Acts as the **command dispatcher**.

Responsibilities:

* Load configuration
* Load pages
* Route commands to output adapters

Supported commands:

* `dev` – runtime dev server
* `json` – JSON export

The CLI does not contain rendering logic.

---

## Configuration Surface

### `src/user/config.js`

Defines user-tunable values:

* Site name
* Active theme
* Pages directory
* Output directory

The configuration intentionally avoids:

* Hooks
* Callbacks
* Arbitrary code execution

This keeps md-engine predictable and safe for non-developers.

---

## Design Constraints (Intentional)

md-engine deliberately avoids:

* HTML templates
* JSX / components
* Framework-specific APIs
* Build pipelines


These constraints keep the engine:

* Small
* Understandable
* Portable
* Long-term maintainable

---





