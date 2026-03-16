// viewer-pages.js — CloudPages demo page registry
//
// Each entry registers a page that can be launched from the viewer.
//
// Fields:
//   title       — display name shown in the pages list and window title
//   description — one-line summary shown in the list
//   file        — HTML filename (relative to this folder)
//   module      — null = visible globally; 'moduleId' = also shown in that module's Pages dropdown
//
// To add a page: copy an existing entry, update the fields, and set module
// to null (global) or to the module key it belongs to (e.g. 'salesOrder').

var DEMO_PAGES = [
    {
        title: 'Sales Summary',
        description: 'Sales orders by customer and date range',
        file: 'SalesSummarySimple.html',
        module: null
    }
];
