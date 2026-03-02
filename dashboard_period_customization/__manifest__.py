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
        'base',
        'web',
    ],
    'data': [
        'data/ir_config_parameter.xml',
        'views/dashboard_period_customization_templates.xml',
    ],
    'installable': True,
    'auto_install': False,
    'application': False,
    'sequence': 100,
    'images': ['static/description/banner.png'],
}
