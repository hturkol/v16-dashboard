# Dashboard Period Customization - Manual Installation

## Installation Without XML Inheritance Issues

This version avoids the `web.assets_backend` inheritance problem by using a controller-based approach.

## Step 1: Install the Module

```bash
./odoo-bin -d your_database -i dashboard_period_customization
```

## Step 2: Add the Script Manually (One-time setup)

After installation, you need to manually add the script to your Odoo backend. Choose one of these methods:

### Method A: Via Odoo Backend Settings

1. Go to **Settings → Technical → System Parameters**
2. Create a new parameter:
   - **Key**: `web.assets_backend_extra_scripts`
   - **Value**: `/dashboard_period_customization/static/src/js/simple_dashboard_customization.js`

### Method B: Via Custom CSS/JS Injection

1. Go to **Settings → Technical → User Interface → Views**
2. Search for `web.assets_backend`
3. Add this script tag to the view:
   ```xml
   <script type="text/javascript" src="/dashboard_period_customization/static/src/js/simple_dashboard_customization.js"/>
   ```

### Method C: Via Browser Console (Temporary)

Open your browser console on any Odoo page and run:
```javascript
var script = document.createElement('script');
script.src = '/dashboard_period_customization/static/src/js/simple_dashboard_customization.js';
document.head.appendChild(script);
```

## Step 3: Verify Installation

1. Go to any dashboard with period selection
2. Look for "📅 Özel Tarih Aralığı" in the dropdown
3. Click it to test the custom date range dialog

## How It Works

- **Controller-based approach**: The JavaScript is served via a custom HTTP route
- **No XML inheritance**: Avoids the `web.assets_backend` dependency issue
- **Automatic detection**: Script finds and enhances existing dropdowns
- **Modal dialog**: Clean interface for custom date selection

## Features

✅ **No dependency conflicts** - Uses only `base` and `web` modules
✅ **Simple installation** - Just install and add script
✅ **Turkish interface** - Full Turkish language support
✅ **Lightweight** - Minimal code, maximum compatibility
✅ **Automatic updates** - Continuously scans for new dropdowns

## Troubleshooting

If the custom option doesn't appear:

1. **Check browser console** for any errors
2. **Verify the script is loaded** in the page source
3. **Refresh the page** after adding the script
4. **Check permissions** on the module files

## Alternative: Direct File Edit

If all else fails, you can manually edit the existing date selection file:

1. Find: `web_widget_advanced_domain/static/src/js/dateSelectionBits/dateSelectionBits.xml`
2. Add this option to the select element:
   ```xml
   <option value="custom_range">📅 Özel Tarih Aralığı</option>
   ```

This approach ensures the module installs without any XML inheritance errors.
