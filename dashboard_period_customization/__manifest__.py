# -*- coding: utf-8 -*-
{
    'name': 'Dashboard Period Customization',
    'version': '16.0.1.0.0',
    'category': 'Extra Tools',
    'summary': 'Custom date range selection for dashboard period filters',
    'description': """
Dashboard Period Customization
=============================

This module adds custom date range selection functionality to dashboard period filters.
It allows users to select custom date ranges beyond the predefined options.

Features:
* Custom date range selection in dashboard period dropdown
* User-friendly date picker interface
* Integration with existing dashboard functionality
* Turkish language support

Author: Custom Development
""",
    'author': 'Custom Development',
    'website': 'https://www.example.com',
    'license': 'LGPL-3',
    'depends': [
        'web_widget_advanced_domain',
        'web',
    ],
    'data': [
        'templates/assets.xml',
        'data/ir_config_parameter.xml',
    ],
    'qweb': [
        'static/src/xml/dashboard_period_customization.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'dashboard_period_customization/static/src/js/dashboard_period_customization.js',
            'dashboard_period_customization/static/src/scss/dashboard_period_customization.scss',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': False,
    'sequence': 100,
    'images': ['static/description/banner.png'],
}
