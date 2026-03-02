# Dashboard Period Customization - Installation Guide

## Fixed Version

This is a simplified version that avoids the dependency issues with `web_widget_advanced_domain`.

## Installation Steps

1. **Copy the module** to your Odoo addons directory:
   ```bash
   cp -r dashboard_period_customization /path/to/odoo/addons/
   ```

2. **Update your addons list**:
   ```bash
   ./odoo-bin -u base --stop-after-init
   ```

3. **Install the module** via:
   - **Apps menu**: Search for "Dashboard Period Customization"
   - **Command line**: 
     ```bash
     ./odoo-bin -d your_database -i dashboard_period_customization
     ```

## How It Works

The module adds a simple JavaScript enhancement that:
1. **Detects date selection dropdowns** on dashboards
2. **Adds "📅 Özel Tarih Aralığı" option** to the dropdown
3. **Shows a modal dialog** for custom date selection
4. **Applies the custom range** when you click "Uygula"

## Features

- ✅ **No complex dependencies** - Only depends on `base` and `web`
- ✅ **Simple installation** - No patching or complex inheritance
- ✅ **Turkish interface** - Full Turkish language support
- ✅ **Lightweight** - Minimal code, maximum compatibility
- ✅ **Automatic detection** - Works with existing dashboard dropdowns

## Usage

1. Go to any dashboard with period selection
2. Click the dropdown menu
3. Select "📅 Özel Tarih Aralığı"
4. Choose your start and end dates
5. Click "Uygula" to apply

## Troubleshooting

If you still get errors:
1. Make sure `web` module is installed
2. Check that the module files have correct permissions
3. Restart Odoo server after installation
4. Clear browser cache

## Support

This simplified version should work without the previous dependency issues.
