# ILC.CloudPages.Demos

Public-facing demo pages for the **ILC CloudPages** platform — a reporting and tooling layer that runs inside [Fishbowl](https://www.fishbowlinventory.com/) (the inventory and manufacturing ERP) via its built-in browser (JXBrowser).

These demos are designed to work two ways:

- **On the web (demo mode)** — pre-loaded with sample data, no Fishbowl installation required. Browse them directly on GitHub Pages.
- **Inside Fishbowl (live mode)** — the same pages connect to real Fishbowl data automatically when opened through the CloudPages module.

---

## Try it — No Installation Required

**[Launch the Fishbowl Client Simulator →](https://ilc-global.github.io/ILC.CloudPages.Demos/viewer.html)**

The simulator gives you a feel for the Fishbowl Client experience without installing anything:

1. The app opens on the **Dashboard** — a familiar ERP home screen with live-looking gadgets
2. Click **Reporting** in the menu bar and select **CloudPages**
3. Browse the **Available Pages** list — this is exactly what Fishbowl users see
4. Click **Open** next to any report to launch it in a floating popup window
5. The report loads with sample data pre-filled — just click **Run Report** to see results

---

## What is CloudPages?

CloudPages is a module built into the Fishbowl ERP client that lets developers and partners deploy custom HTML/JS report pages directly inside Fishbowl. Pages are served from a Git repository and rendered in JXBrowser — Fishbowl's embedded browser engine.

**Key capabilities:**
- Parameterized SQL reports with dropdowns, date pickers, and autocomplete filters
- DataTables rendering with sort, search, pagination, and XLSX/CSV export
- Full access to Fishbowl's database via `fb.js` — the cross-platform query client
- Works identically on the web (demo mode) and inside Fishbowl (live mode) with zero code changes

---

## Available Demos

| Page | Description | Open Standalone |
|------|-------------|-----------------|
| [SalesSummarySimple.html](SalesSummarySimple.html) | Sales orders by customer and date range — built with the `cloudpages.js` declarative report engine (no custom JS) | [Open](https://ilc-global.github.io/ILC.CloudPages.Demos/SalesSummarySimple.html) |

---

## Repository Structure

```
ILC.CloudPages.Demos/
├── viewer.html              # Fishbowl Client simulator — start here
├── SalesSummarySimple.html  # Sales orders report (declarative cloudpages.js pattern)
├── SalesSummary.html        # Sales orders report (custom JS pattern)
├── js/
│   ├── fb.js                # Fishbowl cross-platform query client
│   ├── cloudpages.js        # Declarative report engine
│   ├── fishbowl.js          # FishbowlCSV + FishbowlJSON API factories
│   ├── jquery.min.js
│   ├── jquery.dataTables.min.js
│   ├── dataTables.bootstrap5.min.js
│   ├── bootstrap.bundle.min.js
│   ├── xlsx.full.min.js     # SheetJS — XLSX export
│   └── driver.js.iife.js    # Driver.js — guided tour (standalone mode only)
└── css/
    ├── bootstrap.min.css
    ├── dataTables.bootstrap5.min.css
    ├── cloudpages.css
    └── driver.css
```

All dependencies are vendored locally — no CDN calls, no build step.

---

## Building a New Demo Page

The fastest path is the **declarative pattern** used by `SalesSummarySimple.html`. You write four JSON/SQL `<script>` blocks and `cloudpages.js` handles everything else — parameter forms, query execution, table rendering, and export.

### Minimal template

```html
<!-- 1. Load dependencies -->
<script src="js/fb.js"></script>
<script>
    FB.configure({
        environment: 'demo',
        demoData: {
            queries: {
                "myQuery": [ /* sample rows */ ]
            }
        }
    });
</script>
<script src="js/cloudpages.js"></script>

<!-- 2. Containers -->
<div id="parametersContainer"></div>
<button id="submitButton">Run</button>
<button id="exportBtn">Export</button>
<div id="tableContainer"></div>

<!-- 3. Declarative config -->
<script id="settings"    type="application/json">{ "load_on_open": false }</script>
<script id="parameters"  type="application/json">{ /* param definitions */ }</script>
<script id="myQuery"     type="text/plain">SELECT ... FROM ... WHERE ...</script>
<script id="columns"     type="application/json">{ /* column formatting */ }</script>
```

The `id` on the `<script type="text/plain">` tag is the key `fb.js` uses to match demo data — no fragile substring matching needed.

Once your page works in demo mode, it works live in Fishbowl with no changes.

---

## Related Repositories

| Repo | Purpose |
|------|---------|
| [ILC.Fishbowl.JS](https://github.com/ilc-global/ILC.Fishbowl.JS) | `fb.js` — cross-platform Fishbowl query client and `fishbowl.js` API factories |
| [ILC.CloudPages.JS](https://github.com/ilc-global/ILC.CloudPages.JS) | `cloudpages.js` — declarative report engine built on top of `fb.js` |
| [ILC.CloudPages.DevTools](https://github.com/ilc-global/ILC.CloudPages.DevTools) | Developer diagnostic tools — reference patterns for CloudPages pages |
