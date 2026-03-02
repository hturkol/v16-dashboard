# Dashboard Period Customization

## Overview

This Odoo module adds custom date range selection functionality to dashboard period filters. It allows users to select custom date ranges beyond the predefined options like "Last 7 Days", "Last 30 Days", etc.

## Features

- 🎯 **Custom Date Range Selection**: Users can select specific start and end dates
- 🌐 **Turkish Language Support**: Full Turkish translation included
- 🎨 **Modern UI**: Bootstrap modal with clean interface
- 🔧 **Easy Installation**: Simple module installation and configuration
- 📱 **Responsive Design**: Works on all screen sizes

## Installation

1. Copy the `dashboard_period_customization` folder to your Odoo addons directory
2. Update your addons list: `./odoo-bin -u base --stop-after-init`
3. Install the module from Apps menu or via command line:
   ```bash
   ./odoo-bin -d database_name -i dashboard_period_customization
   ```

## Usage

1. Go to any dashboard with period selection dropdown
2. Click on the dropdown menu
3. Select "📅 Özel Tarih Aralığı" (Custom Date Range)
4. Choose your start and end dates in the modal dialog
5. Click "Uygula" (Apply) to apply the custom date range

## Configuration

The module can be configured through System Parameters:

- `dashboard_period_customization.enabled`: Enable/disable the custom functionality
- `dashboard_period_customization.default_ranges`: Configure which ranges appear in the dropdown

## Technical Details

### Files Structure

```
dashboard_period_customization/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   └── ir_config_parameter.py
├── static/
│   ├── src/
│   │   ├── js/
│   │   │   └── dashboard_period_customization.js
│   │   ├── scss/
│   │   │   └── dashboard_period_customization.scss
│   │   └── xml/
│   │       └── dashboard_period_customization.xml
│   └── description/
│       └── banner.png
├── templates/
│   └── assets.xml
├── data/
│   └── ir_config_parameter.xml
├── i18n/
│   └── tr.po
└── README.md
```

### Dependencies

- `web_widget_advanced_domain`: Base date selection functionality
- `web`: Core web framework

### Customization

The module uses Odoo's patch system to extend the existing `DateSelectionBits` component, ensuring compatibility with other modules and future Odoo updates.

## Support

For issues and questions, please contact your system administrator.

## License

LGPL-3
