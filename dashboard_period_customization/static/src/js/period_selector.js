/** @odoo-module */

import { Component, useExternalListener, useRef, useState } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { RELATIVE_DATE_RANGE_TYPES } from "@spreadsheet/helpers/constants";
import { isFromToValue } from "./period_ranges";

const { DateTime } = luxon;

const PRESET_GROUPS = [
    ["today", "yesterday"],
    [
        "last_week",
        "last_month",
        "last_three_months",
        "last_six_months",
        "last_year",
        "last_three_years",
    ],
    [
        "month_to_date",
        "previous_month",
        "this_quarter",
        "this_year",
        "year_to_date",
        "last_12_months",
    ],
];

function descriptionOf(type) {
    const found = RELATIVE_DATE_RANGE_TYPES.find((t) => t.type === type);
    return found ? String(found.description) : type;
}

/**
 * V19-style period selector for dashboard global date filters.
 * Renders a single dropdown with preset ranges and a custom from/to section.
 *
 * @extends Component
 */
export class PeriodSelector extends Component {
    setup() {
        const value = this.props.model.getters.getGlobalFilterValue(this.props.filter.id);
        this.state = useState({
            open: false,
            customFrom: isFromToValue(value) && value.from ? value.from : "",
            customTo: isFromToValue(value) && value.to ? value.to : "",
        });
        this.rootRef = useRef("root");
        useExternalListener(window, "click", this.onWindowClick);
    }

    get value() {
        return this.props.model.getters.getGlobalFilterValue(this.props.filter.id);
    }

    get groups() {
        return PRESET_GROUPS.map((group) =>
            group.map((type) => ({ type, description: descriptionOf(type) }))
        );
    }

    get currentLabel() {
        const value = this.value;
        if (!value) {
            return String(this.props.filter.label || _t("Period"));
        }
        if (typeof value === "string") {
            return descriptionOf(value);
        }
        if (isFromToValue(value)) {
            const format = (iso) =>
                iso && DateTime.fromISO(iso).isValid
                    ? DateTime.fromISO(iso).toFormat("dd.MM.yyyy")
                    : "…";
            return `${format(value.from)} – ${format(value.to)}`;
        }
        // Fallback for fixed year/quarter/month values kept in the filter
        return String(this.props.filter.label || _t("Period"));
    }

    get isCustomRangeActive() {
        return isFromToValue(this.value);
    }

    isSelected(type) {
        return this.value === type;
    }

    toggleDropdown() {
        this.state.open = !this.state.open;
    }

    onWindowClick(ev) {
        if (this.state.open && this.rootRef.el && !this.rootRef.el.contains(ev.target)) {
            this.state.open = false;
        }
    }

    selectPreset(type) {
        this.props.model.dispatch("SET_GLOBAL_FILTER_VALUE", {
            id: this.props.filter.id,
            value: type,
        });
        this.state.open = false;
    }

    selectAllTime() {
        this.props.model.dispatch("CLEAR_GLOBAL_FILTER_VALUE", { id: this.props.filter.id });
        this.state.open = false;
    }

    applyCustomRange() {
        const { customFrom, customTo } = this.state;
        if (!customFrom || !customTo) {
            return;
        }
        this.props.model.dispatch("SET_GLOBAL_FILTER_VALUE", {
            id: this.props.filter.id,
            value: { from: customFrom, to: customTo },
        });
        this.state.open = false;
    }
}

PeriodSelector.template = "dashboard_period_customization.PeriodSelector";
PeriodSelector.props = {
    filter: Object,
    model: Object,
};
