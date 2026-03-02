# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import request


class DashboardPeriodCustomization(http.Controller):

    @http.route('/dashboard_period_customization/static/src/js/simple_dashboard_customization.js', 
                type='http', auth='public', methods=['GET'])
    def serve_customization_js(self):
        """Serve the JavaScript file for dashboard period customization"""
        js_content = """
/** @odoo-module **/

// Simple dashboard period customization
odoo.define('dashboard_period_customization.simple_customization', function (require) {
    'use strict';

    var core = require('web.core');
    var _t = core._t;

    // Add custom date range functionality to existing date selection dropdowns
    function addCustomDateRangeOption() {
        // Find all date selection dropdowns
        var dateSelects = document.querySelectorAll('select.o_domain_leaf_operator_select');
        
        dateSelects.forEach(function(select) {
            // Check if custom option already exists
            if (!select.querySelector('option[value="custom_range"]')) {
                // Add custom range option
                var customOption = document.createElement('option');
                customOption.value = 'custom_range';
                customOption.textContent = '📅 Özel Tarih Aralığı';
                select.appendChild(customOption);
                
                // Add change event listener
                select.addEventListener('change', function(e) {
                    if (e.target.value === 'custom_range') {
                        showCustomDateRangeDialog(e.target);
                    }
                });
            }
        });
    }

    function showCustomDateRangeDialog(selectElement) {
        // Create modal dialog
        var modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;

        var dialog = document.createElement('div');
        dialog.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 90%;
        `;

        dialog.innerHTML = `
            <h3 style="margin: 0 0 20px 0; color: #333;">Özel Tarih Aralığı Seçin</h3>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Başlangıç Tarihi:</label>
                <input type="date" id="custom_start_date" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Bitiş Tarihi:</label>
                <input type="date" id="custom_end_date" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div style="text-align: right;">
                <button id="cancel_custom_range" style="margin-right: 10px; padding: 8px 16px; border: 1px solid #ddd; background: #f5f5f5; border-radius: 4px; cursor: pointer;">İptal</button>
                <button id="apply_custom_range" style="padding: 8px 16px; border: none; background: #007bff; color: white; border-radius: 4px; cursor: pointer;">Uygula</button>
            </div>
        `;

        modal.appendChild(dialog);
        document.body.appendChild(modal);

        // Handle events
        document.getElementById('cancel_custom_range').addEventListener('click', function() {
            document.body.removeChild(modal);
            // Reset select to previous value
            selectElement.value = 'today';
        });

        document.getElementById('apply_custom_range').addEventListener('click', function() {
            var startDate = document.getElementById('custom_start_date').value;
            var endDate = document.getElementById('custom_end_date').value;
            
            if (startDate && endDate) {
                // Store custom range in a global variable for later use
                window.customDateRange = {
                    start: startDate,
                    end: endDate,
                    type: 'custom'
                };
                
                // Trigger custom event for the dashboard to handle
                var event = new CustomEvent('customDateRangeSelected', {
                    detail: window.customDateRange
                });
                document.dispatchEvent(event);
                
                document.body.removeChild(modal);
                
                // Show success message
                showNotification('Özel tarih aralığı uygulandı: ' + startDate + ' - ' + endDate);
            } else {
                alert('Lütfen başlangıç ve bitiş tarihlerini seçin.');
            }
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
                selectElement.value = 'today';
            }
        });
    }

    function showNotification(message) {
        var notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 10000;
            font-size: 14px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(function() {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    // Initialize when DOM is ready
    function initialize() {
        addCustomDateRangeOption();
        
        // Re-check periodically for new dropdowns (for dynamic content)
        setInterval(addCustomDateRangeOption, 2000);
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    return {
        addCustomDateRangeOption: addCustomDateRangeOption,
        showCustomDateRangeDialog: showCustomDateRangeDialog
    };
});
        """
        
        return request.make_response(
            js_content,
            headers=[('Content-Type', 'application/javascript')]
        )

    @http.route('/dashboard_period_customization/inject_script', type='http', auth='public', methods=['GET'])
    def inject_script(self):
        """Return a script tag that can be injected into pages"""
        script_tag = '<script type="text/javascript" src="/dashboard_period_customization/static/src/js/simple_dashboard_customization.js"></script>'
        return request.make_response(
            script_tag,
            headers=[('Content-Type', 'text/html')]
        )
