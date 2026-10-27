/** @odoo-module */

import { _lt } from "@web/core/l10n/translation";
import { serializeDate, serializeDateTime } from "@web/core/l10n/dates";
import { Domain } from "@web/core/domain";

const { DateTime } = luxon;

/**
 * Extra preset ranges added on top of Odoo's native RELATIVE_DATE_RANGE_TYPES
 * (last_week, last_month, last_three_months, last_six_months, last_year,
 * last_three_years). They are pushed into RELATIVE_DATE_RANGE_TYPES so that
 * SET_GLOBAL_FILTER_VALUE accepts them and getFilterDisplayValue can render
 * their description automatically.
 */
export const EXTRA_DATE_RANGE_TYPES = [
    { type: "today", description: _lt("Today") },
    { type: "yesterday", description: _lt("Yesterday") },
    { type: "month_to_date", description: _lt("Month to Date") },
    { type: "previous_month", description: _lt("Previous Month") },
    { type: "this_quarter", description: _lt("This Quarter") },
    { type: "this_year", description: _lt("This Year") },
    { type: "year_to_date", description: _lt("Year to Date") },
    { type: "last_12_months", description: _lt("Last 12 Months") },
];

const EXTRA_RANGE_TYPE_SET = new Set(EXTRA_DATE_RANGE_TYPES.map((t) => t.type));

export function isExtraRangeType(rangeType) {
    return EXTRA_RANGE_TYPE_SET.has(rangeType);
}

/**
 * @param {*} value a global filter value
 * @returns {boolean} true if the value is a custom {from, to} range
 */
export function isFromToValue(value) {
    return (
        value !== undefined &&
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Boolean(value.from || value.to)
    );
}

function serializeBound(date, fieldType, edge) {
    const bound = edge === "start" ? date.startOf("day") : date.endOf("day");
    return fieldType === "date" ? serializeDate(bound) : serializeDateTime(bound);
}

function boundsToDomain(startDate, endDate, fieldName, fieldType) {
    const domain = [];
    if (startDate && startDate.isValid) {
        domain.push([fieldName, ">=", serializeBound(startDate, fieldType, "start")]);
    }
    if (endDate && endDate.isValid) {
        domain.push([fieldName, "<=", serializeBound(endDate, fieldType, "end")]);
    }
    if (domain.length === 0) {
        return new Domain();
    }
    return new Domain(domain.length === 1 ? domain : ["&", ...domain]);
}

/**
 * Domain for a custom {from, to} range ("Özel Aralık").
 *
 * @param {string} from ISO date (YYYY-MM-DD) or empty
 * @param {string} to ISO date (YYYY-MM-DD) or empty
 * @param {string} fieldName
 * @param {"date" | "datetime"} fieldType
 * @returns {Domain}
 */
export function getCustomRangeDomain(from, to, fieldName, fieldType) {
    const startDate = from ? DateTime.fromISO(from) : undefined;
    const endDate = to ? DateTime.fromISO(to) : undefined;
    return boundsToDomain(startDate, endDate, fieldName, fieldType);
}

/**
 * Domain for the extra preset range types defined in EXTRA_DATE_RANGE_TYPES.
 *
 * @param {DateTime} now current luxon datetime
 * @param {string} rangeType
 * @param {string} fieldName
 * @param {"date" | "datetime"} fieldType
 * @returns {Domain|undefined} undefined when rangeType is not a custom preset
 */
export function getPresetRangeDomain(now, rangeType, fieldName, fieldType) {
    let startDate, endDate;
    switch (rangeType) {
        case "today":
            startDate = now;
            endDate = now;
            break;
        case "yesterday":
            startDate = now.minus({ day: 1 });
            endDate = startDate;
            break;
        case "month_to_date":
            startDate = now.startOf("month");
            endDate = now;
            break;
        case "previous_month": {
            const prev = now.minus({ month: 1 });
            startDate = prev.startOf("month");
            endDate = prev.endOf("month");
            break;
        }
        case "this_quarter":
            startDate = now.startOf("quarter");
            endDate = now.endOf("quarter");
            break;
        case "this_year":
            startDate = now.startOf("year");
            endDate = now.endOf("year");
            break;
        case "year_to_date":
            startDate = now.startOf("year");
            endDate = now;
            break;
        case "last_12_months":
            startDate = now.minus({ months: 12 });
            endDate = now;
            break;
        default:
            return undefined;
    }
    return boundsToDomain(startDate, endDate, fieldName, fieldType);
}
