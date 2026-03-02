# -*- coding: utf-8 -*-

from odoo import models, fields


class IrConfigParameter(models.Model):
    _inherit = 'ir.config_parameter'

    def get_dashboard_period_custom_ranges(self):
        """Get custom date ranges for dashboard period selection"""
        return [
            {'value': 'last_7_days', 'label': 'Son 7 Gün'},
            {'value': 'last_30_days', 'label': 'Son 30 Gün'},
            {'value': 'last_90_days', 'label': 'Son 90 Gün'},
            {'value': 'last_180_days', 'label': 'Son 180 Gün'},
            {'value': 'last_365_days', 'label': 'Son 365 Gün'},
            {'value': 'last_3_years', 'label': 'Son 3 Yıl'},
            {'value': 'custom_range', 'label': 'Özel Tarih Aralığı'},
        ]
