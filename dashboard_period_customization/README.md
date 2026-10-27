# Dashboard Period Customization

## Genel Bakış

Odoo 16 Community'deki **Panolar** (`spreadsheet_dashboard`) ekranındaki tarih
filtrelerini, Odoo 19'dakine benzer tek açılır menülü bir dönem seçici ile
değiştirir.

## Özellikler

- **Hazır dönemler**: Bugün, Dün, Son 7/30/90/180/365 Gün, Son 3 Yıl,
  Aydan Bugüne, Geçen Ay, Bu Çeyrek, Bu Yıl, Yılbaşından Bugüne, Son 12 Ay
- **Tüm Zaman**: Filtreyi temizler
- **Özel Aralık**: Başlangıç–bitiş tarihi seçimi (v17'deki `from_to`
  özelliğinin v16'ya backport'u)
- Türkçe dil desteği

## Nasıl Çalışır

- `FilterValue` template'i `t-inherit` ile patch'lenir ve tarih filtreleri
  `PeriodSelector` komponentiyle render edilir.
- `GlobalFiltersUIPlugin._getDateDomain` patch'lenerek `{from, to}` değerleri
  ve ek preset tipleri `[[alan, ">=", başlangıç], [alan, "<=", bitiş]]`
  domain'ine çevrilir.
- Ek preset tipleri `RELATIVE_DATE_RANGE_TYPES` listesine eklenir; böylece
  `SET_GLOBAL_FILTER_VALUE` doğrulamasından sorunsuz geçerler.

## Gereksinim

Dashboard'da en az bir **tarih tipinde global filter** tanımlı olmalıdır
(`rangeType` fark etmeksizin — `relative`, `month`, `quarter`, `year` hepsi
yeni seçiciyle gösterilir). Filtre yoksa gösterilecek kontrol de yoktur.

## Kurulum

1. Modülü addons dizinine koyulduğundan emin olun (zaten orada)
2. Apps listesini güncelleyin
3. `Dashboard Period Customization` modülünü kurun/yükseltin
4. Tarayıcı önbelleğini temizleyin (Ctrl+F5)

## Dosya Yapısı

```
dashboard_period_customization/
├── __manifest__.py
├── i18n/tr.po
└── static/src/
    ├── js/
    │   ├── period_ranges.js       # preset tipleri + domain yardımcıları
    │   ├── period_selector.js     # OWL dropdown komponenti
    │   └── filter_value_patch.js  # plugin & komponent patch'leri
    ├── xml/
    │   └── period_selector.xml    # template + FilterValue patch'i
    └── scss/
        └── period_selector.scss
```

## License

LGPL-3
