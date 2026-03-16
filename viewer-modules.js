// viewer-modules.js — Fishbowl module simulator configurations
//
// Each key is a module ID used throughout the viewer (navigation, sidebar, Pages dropdown).
//
// Module fields:
//   label        — display name (tab bar, hint bar, Pages dropdown header)
//   icon         — emoji shown in the tab bar (HTML entity string)
//   sidebarGroup — id of the <div class="sb-group"> this module belongs to
//   sidebarItem  — exact text of the sidebar <div class="sb-item"> to highlight (must match)
//   toolbar      — array of button objects or 'sep' for a separator
//                  button: { icon, label }  or  { icon, label, pages: true } for the Pages button
//   list         — left-panel list:  { columns[], rows[][], selectedIndex, foot }
//   detail       — right-panel detail: { title, subtitle, status, fields[], tabs[], tabBody }
//                  fields: [{ label, value }]
//                  tabBody: HTML string rendered in the first tab

var MODULES = {

    salesOrder: {
        label: 'Sales Orders',
        icon: '&#128722;',
        sidebarGroup: 'sbg-sales',
        sidebarItem: 'Sales Orders',
        toolbar: [
            { icon: '&#10133;', label: 'New' },
            { icon: '&#9999;&#65039;', label: 'Edit' },
            { icon: '&#128465;&#65039;', label: 'Delete' },
            'sep',
            { icon: '&#128228;', label: 'Issue' },
            { icon: '&#128230;', label: 'Fulfill' },
            { icon: '&#128666;', label: 'Ship' },
            'sep',
            { icon: '&#128231;', label: 'Email' },
            { icon: '&#128424;&#65039;', label: 'Print' },
            'sep',
            { icon: '&#9729;&#65039;', label: 'Pages', pages: true }
        ],
        list: {
            columns: ['SO #', 'Customer', 'Date', 'Status'],
            rows: [
                ['SO-1042', 'Acme Corp',           '3/10/2026', 'Issued'],
                ['SO-1043', 'Baker Foods',          '3/11/2026', 'Entered'],
                ['SO-1044', 'City Catering',        '3/12/2026', 'Issued'],
                ['SO-1045', 'Delta Deli',           '3/13/2026', 'Partial'],
                ['SO-1046', 'Mountaineer Catering', '3/14/2026', 'Entered']
            ],
            selectedIndex: 2,
            foot: 'Records 1&ndash;5 of 5'
        },
        detail: {
            title: 'SO-1044',
            subtitle: 'City Catering',
            status: 'Issued',
            fields: [
                { label: 'Order Date', value: '3/12/2026' },
                { label: 'Ship By',    value: '3/17/2026' },
                { label: 'Terms',      value: 'Net 30' },
                { label: 'Ship Via',   value: 'FedEx Ground' },
                { label: 'Total',      value: '$3,400.00' }
            ],
            tabs: ['Items', 'Shipping', 'Notes', 'Custom'],
            tabBody: '<table class="detail-table">' +
                '<thead><tr><th>Part Number</th><th>Description</th><th>Qty Ordered</th><th>Qty Fulfilled</th><th>Unit Price</th><th>Total</th></tr></thead>' +
                '<tbody>' +
                '<tr><td>CHOC-MIX-5LB</td><td>Chocolate Cake Mix 5 lb</td><td>80</td><td>0</td><td>$18.00</td><td>$1,440.00</td></tr>' +
                '<tr><td>PACK-BOX-LRG</td><td>Packaging Box &mdash; Large</td><td>80</td><td>0</td><td>$24.50</td><td>$1,960.00</td></tr>' +
                '</tbody>' +
                '<tfoot><tr><td colspan="5" style="text-align:right">Total</td><td>$3,400.00</td></tr></tfoot>' +
                '</table>'
        }
    },

    purchaseOrder: {
        label: 'Purchase Orders',
        icon: '&#128230;',
        sidebarGroup: 'sbg-purchasing',
        sidebarItem: 'Purchase Orders',
        toolbar: [
            { icon: '&#10133;', label: 'New' },
            { icon: '&#9999;&#65039;', label: 'Edit' },
            { icon: '&#128465;&#65039;', label: 'Delete' },
            'sep',
            { icon: '&#128228;', label: 'Issue' },
            { icon: '&#128229;', label: 'Receive' },
            { icon: '&#8617;&#65039;', label: 'Void' },
            'sep',
            { icon: '&#128231;', label: 'Email' },
            { icon: '&#128424;&#65039;', label: 'Print' },
            'sep',
            { icon: '&#9729;&#65039;', label: 'Pages', pages: true }
        ],
        list: {
            columns: ['PO #', 'Vendor', 'Date', 'Status'],
            rows: [
                ['PO-2198', 'Flour Mill Co',  '3/05/2026', 'Issued'],
                ['PO-2199', 'Sugar Cane Inc', '3/08/2026', 'Entered'],
                ['PO-2200', 'Dairy Direct',   '3/10/2026', 'Partial'],
                ['PO-2201', 'Flour Mill Co',  '3/12/2026', 'Issued'],
                ['PO-2202', 'Packaging Plus', '3/14/2026', 'Entered']
            ],
            selectedIndex: 2,
            foot: 'Records 1&ndash;5 of 5'
        },
        detail: {
            title: 'PO-2200',
            subtitle: 'Dairy Direct',
            status: 'Partial',
            fields: [
                { label: 'Order Date', value: '3/10/2026' },
                { label: 'Due Date',   value: '3/20/2026' },
                { label: 'Vendor',     value: 'Dairy Direct' },
                { label: 'Ship Via',   value: 'Vendor Truck' },
                { label: 'Total',      value: '$2,160.00' }
            ],
            tabs: ['Items', 'Receipts', 'Notes', 'Custom'],
            tabBody: '<table class="detail-table">' +
                '<thead><tr><th>Part Number</th><th>Description</th><th>Qty Ordered</th><th>Qty Received</th><th>Unit Cost</th><th>Total</th></tr></thead>' +
                '<tbody>' +
                '<tr><td>BP203</td><td>Butter</td><td>100</td><td>40</td><td>$8.50</td><td>$850.00</td></tr>' +
                '<tr><td>BP204</td><td>White Egg (dozen)</td><td>120</td><td>80</td><td>$5.50</td><td>$660.00</td></tr>' +
                '<tr><td>BD302</td><td>Vanilla Extract (8oz)</td><td>50</td><td>50</td><td>$13.00</td><td>$650.00</td></tr>' +
                '</tbody>' +
                '<tfoot><tr><td colspan="5" style="text-align:right">Total</td><td>$2,160.00</td></tr></tfoot>' +
                '</table>'
        }
    },

    manufactureOrder: {
        label: 'Manufacture Orders',
        icon: '&#127981;',
        sidebarGroup: 'sbg-manufacturing',
        sidebarItem: 'Manufacture Orders',
        toolbar: [
            { icon: '&#10133;', label: 'New' },
            { icon: '&#9999;&#65039;', label: 'Edit' },
            { icon: '&#128465;&#65039;', label: 'Delete' },
            'sep',
            { icon: '&#128228;', label: 'Issue' },
            { icon: '&#9654;&#65039;', label: 'Start' },
            { icon: '&#10004;&#65039;', label: 'Finish' },
            'sep',
            { icon: '&#128424;&#65039;', label: 'Print' },
            'sep',
            { icon: '&#9729;&#65039;', label: 'Pages', pages: true }
        ],
        list: {
            columns: ['MO #', 'BOM Number', 'Description', 'Status'],
            rows: [
                ['MO-5101', 'BB2002', 'Chocolate Fudge Batch (25)',   'Entered'],
                ['MO-5102', 'BB2003', 'Oatmeal Choc Chip Batch (48)', 'Issued'],
                ['MO-5103', 'MB2000', 'Sugar Cookie Wet Mix',         'In Progress'],
                ['MO-5104', 'BB2005', 'Chocolate Chip Batch (24)',    'Entered'],
                ['MO-5105', 'PB3001', 'Blue Raspberry Lemonade',      'Entered']
            ],
            selectedIndex: 2,
            foot: 'Records 1&ndash;5 of 5'
        },
        detail: {
            title: 'MO-5103',
            subtitle: 'Sugar Cookie Wet Mix',
            status: 'In Progress',
            fields: [
                { label: 'BOM',         value: 'MB2000' },
                { label: 'Qty',         value: '5 Pound' },
                { label: 'Start Date',  value: '3/14/2026' },
                { label: 'Finish Date', value: '3/15/2026' },
                { label: 'Location',    value: 'Kitchen A' }
            ],
            tabs: ['Finished Goods', 'Raw Goods', 'Instructions', 'Notes'],
            tabBody: '<table class="detail-table">' +
                '<thead><tr><th>Part Number</th><th>Description</th><th>Qty Required</th><th>Qty Issued</th><th>UOM</th></tr></thead>' +
                '<tbody>' +
                '<tr><td>BD301</td><td>White Sugar</td><td>0.5</td><td>0.5</td><td>Pound</td></tr>' +
                '<tr><td>BD302</td><td>Vanilla Extract</td><td>5</td><td>5</td><td>Ounce</td></tr>' +
                '<tr><td>BP203</td><td>Butter</td><td>5</td><td>3</td><td>Ounce</td></tr>' +
                '<tr><td>BP204</td><td>White Egg</td><td>5</td><td>5</td><td>Each</td></tr>' +
                '</tbody></table>'
        }
    },

    workOrder: {
        label: 'Work Orders',
        icon: '&#128295;',
        sidebarGroup: 'sbg-manufacturing',
        sidebarItem: 'Work Orders',
        toolbar: [
            { icon: '&#10133;', label: 'New' },
            { icon: '&#9999;&#65039;', label: 'Edit' },
            { icon: '&#128465;&#65039;', label: 'Delete' },
            'sep',
            { icon: '&#9654;&#65039;', label: 'Start' },
            { icon: '&#9208;&#65039;', label: 'Pause' },
            { icon: '&#10004;&#65039;', label: 'Finish' },
            'sep',
            { icon: '&#128424;&#65039;', label: 'Print' },
            'sep',
            { icon: '&#9729;&#65039;', label: 'Pages', pages: true }
        ],
        list: {
            columns: ['WO #', 'Description', 'Priority', 'Status'],
            rows: [
                ['WO-3041', 'Mix dry ingredients &mdash; Batch 2002', 'Normal', 'Entered'],
                ['WO-3042', 'Mix wet ingredients &mdash; MB2000',     'High',   'In Progress'],
                ['WO-3043', 'Bake &mdash; Batch 2003',               'Normal', 'Entered'],
                ['WO-3044', 'Pack &mdash; Batch 2004',               'Normal', 'Entered'],
                ['WO-3045', 'Label &mdash; PB3001',                  'Low',    'Entered']
            ],
            selectedIndex: 1,
            foot: 'Records 1&ndash;5 of 5'
        },
        detail: {
            title: 'WO-3042',
            subtitle: 'Mix wet ingredients &mdash; MB2000',
            status: 'In Progress',
            fields: [
                { label: 'MO',          value: 'MO-5103' },
                { label: 'Priority',    value: 'High' },
                { label: 'Start',       value: '3/14/2026' },
                { label: 'Due',         value: '3/14/2026' },
                { label: 'Assigned To', value: 'Line A' }
            ],
            tabs: ['Tasks', 'Materials', 'Notes'],
            tabBody: '<table class="detail-table">' +
                '<thead><tr><th>Step</th><th>Description</th><th>Duration</th><th>Status</th></tr></thead>' +
                '<tbody>' +
                '<tr><td>1</td><td>Gather ingredients from inventory</td><td>10 min</td><td><span class="badge badge-success">Done</span></td></tr>' +
                '<tr><td>2</td><td>Combine butter and sugar in mixer</td><td>15 min</td><td><span class="badge badge-info">Active</span></td></tr>' +
                '<tr><td>3</td><td>Add eggs and vanilla extract</td><td>5 min</td><td><span class="badge badge-secondary">Pending</span></td></tr>' +
                '<tr><td>4</td><td>Mix on medium speed until smooth</td><td>8 min</td><td><span class="badge badge-secondary">Pending</span></td></tr>' +
                '</tbody></table>'
        }
    },

    picking: {
        label: 'Picking',
        icon: '&#128203;',
        sidebarGroup: 'sbg-sales',
        sidebarItem: 'Picking',
        toolbar: [
            { icon: '&#10133;', label: 'New' },
            { icon: '&#129302;', label: 'Auto-Pick' },
            { icon: '&#128465;&#65039;', label: 'Delete' },
            'sep',
            { icon: '&#10004;&#65039;', label: 'Pick All' },
            { icon: '&#128274;', label: 'Commit' },
            'sep',
            { icon: '&#128424;&#65039;', label: 'Print' },
            'sep',
            { icon: '&#9729;&#65039;', label: 'Pages', pages: true }
        ],
        list: {
            columns: ['Pick #', 'Sales Order', 'Priority', 'Status'],
            rows: [
                ['S1007', 'SO-1007', '3-Normal', 'Entered'],
                ['S1022', 'SO-1022', '3-Normal', 'Entered'],
                ['S1023', 'SO-1023', '3-Normal', 'Entered'],
                ['S1024', 'SO-1024', '3-Normal', 'Entered'],
                ['S1054', 'SO-1054', '2-High',   'Entered']
            ],
            selectedIndex: 1,
            foot: 'Records 1&ndash;5 of 5'
        },
        detail: {
            title: 'Pick S1022',
            subtitle: 'Sales Order SO-1022',
            status: 'Entered',
            fields: [
                { label: 'Customer', value: 'Mountaineer Catering' },
                { label: 'Priority', value: '3-Normal' },
                { label: 'Due',      value: '3/17/2026' },
                { label: 'Assigned', value: 'Unassigned' }
            ],
            tabs: ['Items to Pick', 'Notes'],
            tabBody: '<table class="detail-table">' +
                '<thead><tr><th>Part Number</th><th>Description</th><th>Qty Needed</th><th>Location</th><th>Qty Picked</th></tr></thead>' +
                '<tbody>' +
                '<tr><td>CHOC-MIX-5LB</td><td>Chocolate Cake Mix 5 lb</td><td>50</td><td>BIN-A12</td><td>0</td></tr>' +
                '<tr><td>PACK-BOX-MED</td><td>Packaging Box &mdash; Medium</td><td>50</td><td>BIN-B04</td><td>0</td></tr>' +
                '</tbody></table>'
        }
    },

    shipping: {
        label: 'Shipping',
        icon: '&#128666;',
        sidebarGroup: 'sbg-sales',
        sidebarItem: 'Shipping',
        toolbar: [
            { icon: '&#10133;', label: 'New' },
            { icon: '&#9999;&#65039;', label: 'Edit' },
            { icon: '&#128465;&#65039;', label: 'Delete' },
            'sep',
            { icon: '&#128230;', label: 'Pack' },
            { icon: '&#128666;', label: 'Ship' },
            { icon: '&#8617;&#65039;', label: 'Void' },
            'sep',
            { icon: '&#127991;&#65039;', label: 'Label' },
            { icon: '&#128424;&#65039;', label: 'Print' },
            'sep',
            { icon: '&#9729;&#65039;', label: 'Pages', pages: true }
        ],
        list: {
            columns: ['Ship #', 'Ship To', 'Carrier', 'Status'],
            rows: [
                ['S1005', 'Mark Bennett',      'FedEx Ground', 'Entered'],
                ['S1106', "Allen's Groceries", 'UPS Ground',   'Entered'],
                ['S1108', "Allen's Groceries", 'UPS Ground',   'Entered'],
                ['S1110', "Allen's Groceries", 'UPS Ground',   'Packed'],
                ['S1112', "Jim's Bake Shop",   'FedEx Ground', 'Entered']
            ],
            selectedIndex: 0,
            foot: 'Records 1&ndash;5 of 5'
        },
        detail: {
            title: 'Shipment S1005',
            subtitle: 'Mark Bennett',
            status: 'Entered',
            fields: [
                { label: 'Sales Order', value: 'SO-1005' },
                { label: 'Carrier',     value: 'FedEx Ground' },
                { label: 'Service',     value: '2-Day' },
                { label: 'Est. Weight', value: '12.5 lbs' },
                { label: 'Ship Date',   value: '3/15/2026' }
            ],
            tabs: ['Packages', 'Carton Contents', 'Notes'],
            tabBody: '<table class="detail-table">' +
                '<thead><tr><th>Package</th><th>Tracking #</th><th>Weight</th><th>Contents</th><th>Status</th></tr></thead>' +
                '<tbody>' +
                '<tr><td>PKG-001</td><td>&mdash;</td><td>12.5 lbs</td><td>CHOC-MIX-5LB &times; 6</td><td><span class="badge badge-secondary">Pending</span></td></tr>' +
                '</tbody></table>'
        }
    },

    bom: {
        label: 'Bill of Materials',
        icon: '&#128203;',
        sidebarGroup: 'sbg-manufacturing',
        sidebarItem: 'Bill of Materials',
        toolbar: [
            { icon: '&#10133;', label: 'New' },
            { icon: '&#128190;', label: 'Save' },
            { icon: '&#128465;&#65039;', label: 'Delete' },
            { icon: '&#9889;', label: 'Quick Build' },
            { icon: '&#128203;', label: 'Duplicate' },
            'sep',
            { icon: '&#9729;&#65039;', label: 'Pages', pages: true },
            'sep',
            { icon: '&#128231;', label: 'Email' },
            { icon: '&#128424;&#65039;', label: 'Print' },
            { icon: '&#10067;', label: 'How To' },
            { icon: '&#128260;', label: 'Refresh' }
        ],
        list: {
            columns: ['Number', 'Description'],
            rows: [
                ['BB2002', 'Chocolate Fudge Batch (25)'],
                ['BB2003', 'Oatmeal Chocolate Chip Batch (48)'],
                ['BB2004', 'Snickerdoodle Batch (48)'],
                ['BB2005', 'Chocolate Chip Batch (24)'],
                ['MB2000', 'Sugar Cookie Wet Ingredient Mix'],
                ['MB2100', 'Sugar Cookie Dry Ingredient Mix'],
                ['MB2200', 'Sugar Cookie Dough'],
                ['PB3001', 'Blue Raspberry Lemonade'],
                ['PB3002', 'Pink Lemonade'],
                ['PB3003', 'Strawberry Lemonade']
            ],
            selectedIndex: 4,
            foot: 'Records 1&ndash;10 of 24'
        },
        detail: {
            title: 'MB2000',
            subtitle: 'Sugar Cookie Wet Ingredient Mix',
            status: 'Active',
            fields: [
                { label: 'Number',         value: 'MB2000' },
                { label: 'Auto Create',    value: 'Never' },
                { label: 'Short Qty',      value: '&mdash;' },
                { label: 'Order Qty',      value: '&mdash;' },
                { label: 'Build To Order', value: 'No' }
            ],
            tabs: ['General', 'Details', 'Instructions', 'Default Locations', 'Memo', 'Custom'],
            tabBody:
                '<div class="detail-section">' +
                    '<div class="detail-section-title">Finished Goods</div>' +
                    '<table class="detail-table">' +
                    '<thead><tr><th>Part Number</th><th>Part Description</th><th>Quantity</th><th>UOM</th><th>Stage</th></tr></thead>' +
                    '<tbody>' +
                    '<tr><td><strong>MB2000</strong></td><td>Sugar Cookie Wet Ingredient Mix</td><td>1</td><td>Pound</td><td>&mdash;</td></tr>' +
                    '</tbody></table>' +
                '</div>' +
                '<div class="detail-section">' +
                    '<div class="detail-section-title">Raw Goods</div>' +
                    '<table class="detail-table">' +
                    '<thead><tr><th>Part Number</th><th>Part Description</th><th>Quantity</th><th>UOM</th><th>Stage</th></tr></thead>' +
                    '<tbody>' +
                    '<tr><td>BD301</td><td>White Sugar</td><td>0.1</td><td>Pound</td><td>&mdash;</td></tr>' +
                    '<tr><td>BD302</td><td>Vanilla Extract</td><td>1</td><td>Ounce</td><td>&mdash;</td></tr>' +
                    '<tr><td>BP203</td><td>Butter</td><td>1</td><td>Ounce</td><td>&mdash;</td></tr>' +
                    '<tr><td>BP204</td><td>White Egg</td><td>1</td><td>Each</td><td>&mdash;</td></tr>' +
                    '</tbody></table>' +
                '</div>'
        }
    }
};
