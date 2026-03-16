// viewer.js — Fishbowl Client Simulator runtime
// Depends on: DEMO_PAGES and MODULES defined in inline <script> blocks before this file loads.

// ── State ─────────────────────────────────────────────────────────
var currentState    = 'dashboard'; // 'dashboard' | 'cloudpages' | 'module'
var currentModuleId = null;

// ── Hint bar ──────────────────────────────────────────────────────
function setHint(html) {
    document.getElementById('hint-text').innerHTML = html;
}

// ── Sidebar group toggle ──────────────────────────────────────────
document.querySelectorAll('.sb-group-title').forEach(function (el) {
    el.addEventListener('click', function () {
        el.closest('.sb-group').classList.toggle('expanded');
    });
});

// ── Sidebar item nav ──────────────────────────────────────────────
document.querySelectorAll('.sb-item[data-nav]').forEach(function (el) {
    el.addEventListener('click', function () {
        var nav = el.dataset.nav;
        if (nav === 'dashboard')       { goToDashboard(); }
        else if (nav === 'cloudpages') { goToCloudPages(null); }
        else if (MODULES[nav])         { goToModule(nav); }
    });
});

// ── Menu bar dropdowns ────────────────────────────────────────────
var openDropdown = null;

function setupMenu(menuId, dropdownId) {
    var menu = document.getElementById(menuId);
    var dd   = document.getElementById(dropdownId);
    menu.addEventListener('click', function (e) {
        e.stopPropagation();
        if (openDropdown && openDropdown !== dd) {
            openDropdown.classList.remove('show');
            document.querySelectorAll('.fb-menu-item.open').forEach(function (m) { m.classList.remove('open'); });
        }
        var rect    = menu.getBoundingClientRect();
        var barRect = document.getElementById('fb-menubar').getBoundingClientRect();
        dd.style.left = (rect.left - barRect.left) + 'px';
        var isOpen = dd.classList.toggle('show');
        menu.classList.toggle('open', isOpen);
        openDropdown = isOpen ? dd : null;
    });
    dd.querySelectorAll('[data-nav]').forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.stopPropagation();
            dd.classList.remove('show');
            menu.classList.remove('open');
            openDropdown = null;
            var nav = item.dataset.nav;
            if (nav === 'cloudpages')  { goToCloudPages(null); }
            else if (MODULES[nav])     { goToModule(nav); }
        });
    });
}

setupMenu('menu-reporting',     'dd-reporting');
setupMenu('menu-sales',         'dd-sales');
setupMenu('menu-purchasing',    'dd-purchasing');
setupMenu('menu-manufacturing', 'dd-manufacturing');

document.addEventListener('click', function (e) {
    document.querySelectorAll('.fb-dropdown.show').forEach(function (dd) { dd.classList.remove('show'); });
    document.querySelectorAll('.fb-menu-item.open').forEach(function (m) { m.classList.remove('open'); });
    openDropdown = null;
    var pdd = document.getElementById('pages-dd');
    if (pdd && pdd.classList.contains('show') && !pdd.contains(e.target)) {
        pdd.classList.remove('show');
    }
});

// ── Sidebar helpers ───────────────────────────────────────────────
function clearSidebarActive() {
    document.querySelectorAll('.sb-item.active').forEach(function (el) { el.classList.remove('active'); });
}

function collapseAllSidebarGroups() {
    document.querySelectorAll('.sb-group.expanded').forEach(function (g) { g.classList.remove('expanded'); });
}

// ── Panel helpers ─────────────────────────────────────────────────
function clearPanels() {
    document.querySelectorAll('.fb-panel.active').forEach(function (p) { p.classList.remove('active'); });
    document.getElementById('fb-content').classList.remove('module-active');
}

// ── Navigate: Dashboard ───────────────────────────────────────────
function goToDashboard() {
    currentState    = 'dashboard';
    currentModuleId = null;

    document.getElementById('fb-toolbar').innerHTML = [
        '<button class="tb-btn"><span class="tb-icon">💾</span>Save Layout</button>',
        '<button class="tb-btn"><span class="tb-icon">📂</span>Load Layout</button>',
        '<div class="tb-sep"></div>',
        '<button class="tb-btn"><span class="tb-icon">📧</span>Email</button>',
        '<button class="tb-btn"><span class="tb-icon">🖨️</span>Print</button>',
        '<button class="tb-btn"><span class="tb-icon">❓</span>How To</button>',
        '<div class="tb-sep"></div>',
        '<button class="tb-btn"><span class="tb-icon">🔄</span>Refresh</button>'
    ].join('');

    document.getElementById('fb-tabbar').innerHTML =
        '<div class="fb-tab">Home</div><div class="fb-tab active">Dashboard</div>';

    clearSidebarActive();
    collapseAllSidebarGroups();
    document.getElementById('sbg-general').classList.add('expanded');
    document.getElementById('sb-dashboard').classList.add('active');

    clearPanels();
    document.getElementById('panel-dashboard').classList.add('active');

    setHint('This is a simulated Fishbowl client. Click <strong>Reporting</strong> in the menu bar to navigate to CloudPages, or explore modules via <strong>Sales</strong>, <strong>Purchasing</strong>, and <strong>Manufacturing</strong>.');
}

// ── Navigate: CloudPages ──────────────────────────────────────────
function goToCloudPages(filterModuleId) {
    currentState    = 'cloudpages';
    currentModuleId = null;

    document.getElementById('fb-toolbar').innerHTML = [
        '<button class="tb-btn"><span class="tb-icon">➕</span>New</button>',
        '<button class="tb-btn"><span class="tb-icon">🐛</span>Debug</button>',
        '<div class="tb-sep"></div>',
        '<button class="tb-btn"><span class="tb-icon">🔄</span>Refresh</button>'
    ].join('');

    document.getElementById('fb-tabbar').innerHTML =
        '<div class="fb-tab">Home</div><div class="fb-tab">Dashboard</div><div class="fb-tab active">CloudPages</div>';

    clearSidebarActive();
    collapseAllSidebarGroups();
    document.getElementById('sbg-reporting').classList.add('expanded');
    document.querySelectorAll('#sb-reporting-items .sb-item').forEach(function (el) {
        if (el.dataset.nav === 'cloudpages') el.classList.add('active');
    });

    clearPanels();
    document.getElementById('panel-cloudpages').classList.add('active');

    var pages = filterModuleId
        ? DEMO_PAGES.filter(function (p) { return p.module === filterModuleId || !p.module; })
        : DEMO_PAGES;
    buildPagesTable(pages);

    var label = filterModuleId && MODULES[filterModuleId] ? ' — ' + MODULES[filterModuleId].label : '';
    setHint('You\'re in <strong>Reporting → CloudPages' + label + '</strong>. Click <strong>Open</strong> next to a report to launch it.');
}

// ── Navigate: Module ──────────────────────────────────────────────
function goToModule(moduleId) {
    var m = MODULES[moduleId];
    if (!m) return;
    currentState    = 'module';
    currentModuleId = moduleId;

    // Toolbar
    var tbHtml = m.toolbar.map(function (btn) {
        if (btn === 'sep') return '<div class="tb-sep"></div>';
        var cls     = 'tb-btn' + (btn.pages ? ' pages-btn' : '');
        var onclick = btn.pages ? ' onclick="openPagesDropdown(event,\'' + moduleId + '\')"' : '';
        return '<button class="' + cls + '"' + onclick + '><span class="tb-icon">' + btn.icon + '</span>' + btn.label + '</button>';
    }).join('');
    document.getElementById('fb-toolbar').innerHTML = tbHtml;

    // Tabs
    document.getElementById('fb-tabbar').innerHTML =
        '<div class="fb-tab">Home</div>' +
        '<div class="fb-tab">Dashboard</div>' +
        '<div class="fb-tab active">' + m.icon + ' ' + m.label + '</div>';

    // Sidebar
    clearSidebarActive();
    collapseAllSidebarGroups();
    var grp = document.getElementById(m.sidebarGroup);
    if (grp) {
        grp.classList.add('expanded');
        grp.querySelectorAll('.sb-item').forEach(function (el) {
            if (el.textContent.trim() === m.sidebarItem) el.classList.add('active');
        });
    }

    // Build module panel HTML
    var list       = m.list;
    var headerCols = list.columns.map(function (c) { return '<th>' + c + '</th>'; }).join('');
    var bodyRows   = list.rows.map(function (row, i) {
        var cls   = (i === list.selectedIndex) ? ' class="selected"' : '';
        var cells = row.map(function (cell) { return '<td>' + escHtml(cell) + '</td>'; }).join('');
        return '<tr' + cls + '>' + cells + '</tr>';
    }).join('');

    var det          = m.detail;
    var headerFields = det.fields.map(function (f) {
        return '<div class="mdh-field"><label>' + f.label + '</label><span>' + escHtml(f.value) + '</span></div>';
    }).join('');
    var tabs = det.tabs.map(function (t, i) {
        return '<div class="module-detail-tab' + (i === 0 ? ' active' : '') + '">' + t + '</div>';
    }).join('');

    var panelHtml =
        '<div class="module-layout">' +
            '<div class="module-left">' +
                '<div class="module-list-search"><input type="text" placeholder="Search ' + m.label + '..."></div>' +
                '<div class="module-list">' +
                    '<table class="ml-table">' +
                        '<thead><tr>' + headerCols + '</tr></thead>' +
                        '<tbody>' + bodyRows + '</tbody>' +
                    '</table>' +
                '</div>' +
                '<div class="module-list-foot">' + list.foot + '</div>' +
            '</div>' +
            '<div class="module-right">' +
                '<div class="module-detail-header">' +
                    '<div class="mdh-top">' +
                        '<span class="mdh-title">'    + escHtml(det.title)    + '</span>' +
                        '<span class="mdh-subtitle">' + escHtml(det.subtitle) + '</span>' +
                        '<span class="mdh-status">'   + escHtml(det.status)   + '</span>' +
                    '</div>' +
                    '<div class="mdh-fields">' + headerFields + '</div>' +
                '</div>' +
                '<div class="module-detail-tabs">' + tabs + '</div>' +
                '<div class="module-detail-body">'  + det.tabBody + '</div>' +
            '</div>' +
        '</div>';

    clearPanels();
    var panel = document.getElementById('panel-module');
    panel.innerHTML = panelHtml;
    panel.classList.add('active');
    document.getElementById('fb-content').classList.add('module-active');

    setHint('You\'re viewing <strong>' + m.label + '</strong>. Click <strong>Pages</strong> in the toolbar to see CloudPages reports for this module.');
}

// ── Build Available Pages table ───────────────────────────────────
function buildPagesTable(pages) {
    var table = document.getElementById('pages-table');
    var rows  = pages.map(function (p) {
        return '<tr>' +
            '<td>' + escHtml(p.title) + '</td>' +
            '<td style="color:#666">' + escHtml(p.description) + '</td>' +
            '<td><button class="open-btn" data-file="' + escHtml(p.file) + '" data-title="' + escHtml(p.title) + '">Open</button></td>' +
            '</tr>';
    }).join('');
    table.innerHTML = '<tr><th>Title</th><th>Description</th><th style="width:100px">Actions</th></tr>' + rows;
    table.querySelectorAll('.open-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            openReport(btn.dataset.file, btn.dataset.title);
        });
    });
}

// ── Pages search filter ───────────────────────────────────────────
document.getElementById('pages-search').addEventListener('input', function () {
    var q        = this.value.toLowerCase();
    var filtered = DEMO_PAGES.filter(function (p) {
        return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    });
    buildPagesTable(filtered);
});

// ── Window manager ────────────────────────────────────────────────
var wins      = []; // [{id, title, file, el, minimized, maximized, savedRect}]
var nextId    = 1;
var nextZ     = 600;
var dragState = null;

function openReport(file, title) {
    for (var i = 0; i < wins.length; i++) {
        if (wins[i].file === file) {
            if (wins[i].minimized) restoreWin(wins[i].id);
            else focusWin(wins[i].id);
            return;
        }
    }
    createWin(file, title);
}

function createWin(file, title) {
    var id     = nextId++;
    var fbBody = document.getElementById('fb-body');
    var bw     = fbBody.offsetWidth,  bh = fbBody.offsetHeight;
    var pw     = Math.round(bw * 0.55), ph = Math.round(bh * 0.60);
    var pl     = Math.round((bw - pw) / 2), pt = Math.round((bh - ph) / 2);

    var now       = new Date();
    var ds        = (now.getMonth() + 1) + '/' + now.getDate() + '/' + String(now.getFullYear()).slice(2) + ', ' +
                    now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    var fullTitle = title + ' — ' + ds;

    var el = document.createElement('div');
    el.className = 'cp-popup focused';
    el.id        = 'win-' + id;
    el.style.cssText = 'left:' + pl + 'px;top:' + pt + 'px;width:' + pw + 'px;height:' + ph + 'px;z-index:' + nextZ + ';';
    el.innerHTML =
        '<div class="cp-popup-titlebar" data-winid="' + id + '">' +
            '<span style="font-size:13px">☁️</span>' +
            '<span class="cp-popup-title">' + escHtml(fullTitle) + '</span>' +
            '<div style="display:flex;gap:3px;">' +
                '<div class="cp-win-btn" data-action="minimize" data-winid="' + id + '">—</div>' +
                '<div class="cp-win-btn" data-action="maximize" data-winid="' + id + '">⬜</div>' +
                '<div class="cp-win-btn close" data-action="close" data-winid="' + id + '">✕</div>' +
            '</div>' +
        '</div>' +
        '<div class="cp-popup-toolbar">' +
            '<button class="cp-tb-btn"><span class="cp-tb-icon">❓</span>Help</button>' +
            '<button class="cp-tb-btn"><span class="cp-tb-icon">🔄</span>Refresh</button>' +
            '<button class="cp-tb-btn"><span class="cp-tb-icon">📁</span>Fold...</button>' +
            '<button class="cp-tb-btn"><span class="cp-tb-icon">⛶</span>Full Screen</button>' +
        '</div>' +
        '<div class="cp-popup-body">' +
            '<iframe class="cp-popup-iframe" src="' + escHtml(file) + '" data-winid="' + id + '"></iframe>' +
            '<div class="cp-popup-shield"></div>' +
        '</div>' +
        '<div class="cp-resize-e"  data-resize="e"  data-winid="' + id + '"></div>' +
        '<div class="cp-resize-s"  data-resize="s"  data-winid="' + id + '"></div>' +
        '<div class="cp-resize-se" data-resize="se" data-winid="' + id + '"></div>' +
        '<div class="cp-popup-statusbar">Loading...</div>';

    fbBody.appendChild(el);
    var iframe = el.querySelector('iframe');
    var status = el.querySelector('.cp-popup-statusbar');
    iframe.onload = function () { status.textContent = 'Ready...'; };

    wins.push({ id: id, title: fullTitle, file: file, el: el, minimized: false, maximized: false, savedRect: null });
    nextZ++;
    wireWin(el, id);
    renderTaskbar();
    setHint('Report opened — drag the title bar to reposition, resize from the edges, or use the taskbar below to switch between open windows.');
}

function focusWin(id) {
    var w = getWin(id);
    if (!w) return;
    document.querySelectorAll('.cp-popup').forEach(function (p) { p.classList.remove('focused'); });
    w.el.style.zIndex = ++nextZ;
    w.el.classList.add('focused');
    renderTaskbar();
}

function minimizeWin(id) {
    var w = getWin(id);
    if (!w) return;
    w.minimized = true;
    w.el.classList.add('minimized');
    renderTaskbar();
}

function restoreWin(id) {
    var w = getWin(id);
    if (!w) return;
    w.minimized = false;
    w.el.classList.remove('minimized');
    focusWin(id);
}

function toggleMaximizeWin(id) {
    var w = getWin(id);
    if (!w) return;
    if (w.maximized) {
        w.maximized = false;
        w.el.classList.remove('maximized');
        if (w.savedRect) {
            w.el.style.left   = w.savedRect.left;
            w.el.style.top    = w.savedRect.top;
            w.el.style.width  = w.savedRect.width;
            w.el.style.height = w.savedRect.height;
        }
        var btn = w.el.querySelector('[data-action="maximize"]');
        if (btn) btn.textContent = '⬜';
    } else {
        w.savedRect = { left: w.el.style.left, top: w.el.style.top, width: w.el.style.width, height: w.el.style.height };
        w.maximized = true;
        w.el.classList.add('maximized');
        var btn = w.el.querySelector('[data-action="maximize"]');
        if (btn) btn.textContent = '❐';
    }
    focusWin(id);
}

function closeWin(id) {
    var w = getWin(id);
    if (!w) return;
    var iframe = w.el.querySelector('iframe');
    if (iframe) iframe.src = 'about:blank';
    w.el.parentNode.removeChild(w.el);
    wins = wins.filter(function (x) { return x.id !== id; });
    renderTaskbar();
}

function getWin(id) {
    for (var i = 0; i < wins.length; i++) { if (wins[i].id === id) return wins[i]; }
    return null;
}

// ── Wire window events ────────────────────────────────────────────
function wireWin(el, id) {
    el.addEventListener('click', function (e) {
        var action = e.target.dataset.action;
        var wid    = parseInt(e.target.dataset.winid);
        if (isNaN(wid)) return;
        if (action === 'minimize')      { minimizeWin(wid); }
        else if (action === 'maximize') { toggleMaximizeWin(wid); }
        else if (action === 'close')    { closeWin(wid); }
    });

    el.querySelector('.cp-popup-titlebar').addEventListener('dblclick', function (e) {
        if (e.target.classList.contains('cp-win-btn')) return;
        toggleMaximizeWin(id);
    });

    el.addEventListener('mousedown', function (e) {
        focusWin(id);
        var tb = e.target.closest('.cp-popup-titlebar');
        if (tb && !e.target.classList.contains('cp-win-btn')) {
            var w = getWin(id);
            if (w && w.maximized) return;
            startDrag(e, id, 'drag');
        }
        if (e.target.dataset.resize) {
            var w = getWin(id);
            if (w && w.maximized) return;
            startDrag(e, id, e.target.dataset.resize);
        }
    });
}

// ── Drag / resize ─────────────────────────────────────────────────
function startDrag(e, winId, action) {
    e.preventDefault();
    e.stopPropagation();
    var w = getWin(winId);
    if (!w) return;
    var el         = w.el;
    var rect       = el.getBoundingClientRect();
    var parentRect = el.offsetParent.getBoundingClientRect();
    el.style.left   = (rect.left - parentRect.left) + 'px';
    el.style.top    = (rect.top  - parentRect.top)  + 'px';
    el.style.width  = rect.width  + 'px';
    el.style.height = rect.height + 'px';
    el.style.right  = 'auto';
    el.style.bottom = 'auto';
    dragState = {
        winId:  winId, action: action,
        startX: e.clientX, startY: e.clientY,
        startL: parseFloat(el.style.left),  startT: parseFloat(el.style.top),
        startW: parseFloat(el.style.width), startH: parseFloat(el.style.height)
    };
    var shield = el.querySelector('.cp-popup-shield');
    if (shield) shield.classList.add('active');
    document.body.style.userSelect = 'none';
}

document.addEventListener('mousemove', function (e) {
    if (!dragState) return;
    var w = getWin(dragState.winId);
    if (!w) return;
    var dx = e.clientX - dragState.startX, dy = e.clientY - dragState.startY;
    if (dragState.action === 'drag') {
        w.el.style.left = (dragState.startL + dx) + 'px';
        w.el.style.top  = (dragState.startT + dy) + 'px';
    } else {
        if (dragState.action === 'e'  || dragState.action === 'se') w.el.style.width  = Math.max(320, dragState.startW + dx) + 'px';
        if (dragState.action === 's'  || dragState.action === 'se') w.el.style.height = Math.max(220, dragState.startH + dy) + 'px';
    }
});

document.addEventListener('mouseup', function () {
    if (!dragState) return;
    var w = getWin(dragState.winId);
    if (w) {
        var shield = w.el.querySelector('.cp-popup-shield');
        if (shield) shield.classList.remove('active');
    }
    dragState = null;
    document.body.style.userSelect = '';
});

// ── Taskbar ───────────────────────────────────────────────────────
function renderTaskbar() {
    var container = document.getElementById('win-tb-windows');
    if (!container) return;
    if (wins.length === 0) { container.innerHTML = ''; return; }

    var maxZ = -1, focusedId = -1;
    wins.forEach(function (w) {
        if (!w.minimized && parseInt(w.el.style.zIndex) > maxZ) {
            maxZ = parseInt(w.el.style.zIndex);
            focusedId = w.id;
        }
    });

    container.innerHTML = wins.map(function (w) {
        var isFocused  = (w.id === focusedId);
        var cls        = 'win-tb-btn' + (isFocused ? ' focused' : '') + (w.minimized ? ' minimized-btn' : '');
        var shortTitle = w.title.length > 24 ? w.title.slice(0, 22) + '…' : w.title;
        return '<div class="' + cls + '" data-tbwinid="' + w.id + '">' +
            '<span class="win-tb-icon">☁️</span>' +
            '<span class="win-tb-label">' + escHtml(shortTitle) + '</span>' +
            '<span class="win-tb-x" data-tbclose="' + w.id + '" title="Close">✕</span>' +
        '</div>';
    }).join('');

    container.querySelectorAll('.win-tb-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var closeId = parseInt(e.target.dataset.tbclose);
            if (!isNaN(closeId)) { closeWin(closeId); return; }
            var wid = parseInt(btn.dataset.tbwinid);
            var w   = getWin(wid);
            if (!w) return;
            if (w.minimized)      { restoreWin(wid); }
            else if (w.id === focusedId) { minimizeWin(wid); }
            else                  { focusWin(wid); }
        });
    });
}

// ── Taskbar clock ─────────────────────────────────────────────────
function updateClock() {
    var el = document.getElementById('win-tb-clock');
    if (!el) return;
    var now  = new Date();
    var time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    var date = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
    el.innerHTML = time + '<br>' + date;
}
setInterval(updateClock, 1000);
updateClock();

// ── Pages dropdown ────────────────────────────────────────────────
function openPagesDropdown(e, moduleId) {
    e.stopPropagation();
    var btn  = e.currentTarget || e.target;
    var rect = btn.getBoundingClientRect();
    var m    = MODULES[moduleId];
    var dd   = document.getElementById('pages-dd');

    document.getElementById('pages-dd-label').textContent =
        (m ? m.label : 'All') + ' — Available Pages';

    var pages = DEMO_PAGES.filter(function (p) { return !p.module || p.module === moduleId; });
    var body  = document.getElementById('pages-dd-body');

    if (pages.length === 0) {
        body.innerHTML = '<div class="pages-dd-empty">No pages available for this module.</div>';
    } else {
        body.innerHTML = pages.map(function (p) {
            return '<div class="pages-dd-row">' +
                '<div class="pages-dd-info">' +
                    '<div class="pages-dd-title">' + escHtml(p.title)       + '</div>' +
                    '<div class="pages-dd-desc">'  + escHtml(p.description) + '</div>' +
                '</div>' +
                '<button class="open-btn" data-file="' + escHtml(p.file) + '" data-title="' + escHtml(p.title) + '">Open</button>' +
            '</div>';
        }).join('');
        body.querySelectorAll('.open-btn').forEach(function (b) {
            b.addEventListener('click', function () {
                closePagesDropdown();
                openReport(b.dataset.file, b.dataset.title);
            });
        });
    }

    var top    = rect.bottom + 4;
    var left   = rect.left;
    var ddWidth = 360;
    if (left + ddWidth > window.innerWidth - 8) { left = Math.max(8, window.innerWidth - ddWidth - 8); }
    dd.style.top  = top  + 'px';
    dd.style.left = left + 'px';
    dd.classList.add('show');
}

function closePagesDropdown() {
    document.getElementById('pages-dd').classList.remove('show');
}

// ── Utility ───────────────────────────────────────────────────────
function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Init ──────────────────────────────────────────────────────────
buildPagesTable(DEMO_PAGES);
