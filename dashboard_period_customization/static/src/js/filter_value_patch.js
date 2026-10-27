/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { Domain } from "@web/core/domain";
import { RELATIVE_DATE_RANGE_TYPES } from "@spreadsheet/helpers/constants";
import { getRelativeDateDomain } from "@spreadsheet/global_filters/helpers";
import { FilterValue } from "@spreadsheet/global_filters/components/filter_value/filter_value";
import GlobalFiltersUIPlugin from "@spreadsheet/global_filters/plugins/global_filters_ui_plugin";
import { PeriodSelector } from "./period_selector";
import {
    EXTRA_DATE_RANGE_TYPES,
    getCustomRangeDomain,
    getPresetRangeDomain,
    isExtraRangeType,
    isFromToValue,
} from "./period_ranges";

const { DateTime } = luxon;

// Render PeriodSelector inside the FilterValue template (patched via t-inherit
// in period_selector.xml). The component must be registered statically.
FilterValue.components = Object.assign({}, FilterValue.components, { PeriodSelector });

// Make the extra preset types valid SET_GLOBAL_FILTER_VALUE values: the core
// validation (checkFiltersTypeValueCombination) accepts any string present in
// RELATIVE_DATE_RANGE_TYPES, and getFilterDisplayValue resolves the
// description from the same list.
const knownTypes = new Set(RELATIVE_DATE_RANGE_TYPES.map((t) => t.type));
for (const rangeType of EXTRA_DATE_RANGE_TYPES) {
    if (!knownTypes.has(rangeType.type)) {
        RELATIVE_DATE_RANGE_TYPES.push(rangeType);
    }
}

patch(GlobalFiltersUIPlugin.prototype, "dashboard_period_customization.filters", {
    /**
     * Extend the date domain computation with custom {from, to} ranges and
     * the extra preset range types. Native range types still go through the
     * original implementation.
     */
    _getDateDomain(filter, fieldMatching) {
        const value = this.getGlobalFilterValue(filter.id);
        const field = fieldMatching.chain;
        const type = fieldMatching.type;
        if (isFromToValue(value)) {
            if (!field) {
                return new Domain();
            }
            return getCustomRangeDomain(value.from, value.to, field, type);
        }
        if (typeof value === "string") {
            // The period selector always sends a relative range string or a
            // {from, to} object — regardless of the filter's own rangeType
            // (quarter/year filters may still receive relative values).
            if (!field) {
                return new Domain();
            }
            const offset = fieldMatching.offset || 0;
            const now = DateTime.local();
            if (isExtraRangeType(value)) {
                return getPresetRangeDomain(now, value, field, type);
            }
            return getRelativeDateDomain(now, offset, value, field, type) || new Domain();
        }
        return this._super(filter, fieldMatching);
    },

    /**
     * A filter holding a custom {from, to} value must count as active so the
     * clear button appears and the badge count stays correct.
     */
    isGlobalFilterActive(id) {
        const filter = this.getters.getGlobalFilter(id);
        if (filter && filter.type === "date" && isFromToValue(this.getGlobalFilterValue(id))) {
            return true;
        }
        return this._super(id);
    },

    /**
     * Display value of the filter inside FILTER.VALUE cells and the Excel
     * export sheet.
     */
    getFilterDisplayValue(filterName) {
        const filter = this.getters.getGlobalFilterLabel(filterName);
        const value = filter && this.getGlobalFilterValue(filter.id);
        if (isFromToValue(value)) {
            const format = (iso) =>
                iso && DateTime.fromISO(iso).isValid
                    ? DateTime.fromISO(iso).toFormat("dd/MM/yyyy")
                    : "";
            return `${format(value.from)} - ${format(value.to)}`;
        }
        return this._super(filterName);
    },
});
