# -*- coding: utf-8 -*-
{
    'name': 'Dashboard Period Customization',
    'version': '16.0.2.0.0',
    'category': 'Extra Tools',
    'summary': 'Custom date range and extended period presets for spreadsheet dashboard filters',
    'description': """
Dashboard Period Customization
==============================

Replaces the date filter controls on spreadsheet dashboards
(spreadsheet_dashboard) with a unified period selector:

* Preset ranges: Today, Yesterday, Last 7/30/90/180/365 Days, Last 3 Years,
  Month to Date, Previous Month, This Quarter, This Year, Year to Date,
  Last 12 Months
* All Time (clears the filter)
* Custom Range (from/to date pickers) — backport of the v17 "from_to"
  global filter capability to v16

Turkish translations included.
""",
    'author': 'Custom Development',
    'license': 'LGPL-3',
    'depends': [
        'spreadsheet_dashboard',
    ],
    'data': [],
    'assets': {
        'web.assets_backend': [
            'dashboard_period_customization/static/src/scss/period_selector.scss',
            'dashboard_period_customization/static/src/js/period_ranges.js',
            'dashboard_period_customization/static/src/js/period_selector.js',
            'dashboard_period_customization/static/src/js/filter_value_patch.js',
            'dashboard_period_customization/static/src/xml/period_selector.xml',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': False,
    'sequence': 100,
    'images': ['static/description/banner.png'],
}
