/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
import { patch } from "web.utils";
import { DateSelectionBits } from "web_widget_advanced_domain.DateSelectionBits";

patch(
    DateSelectionBits.prototype,
    "dashboard_period_customization/static/src/js/dashboard_period_customization.js",
    (T) =>
        class extends T {
            setup() {
                super.setup(...arguments);
                this.state = useState({
                    showCustomDialog: false,
                    customStartDate: null,
                    customEndDate: null,
                });
            }

            onchange(ev) {
                if (ev.target.value === 'custom_range') {
                    this._openCustomDateRangeDialog();
                } else {
                    this.props.onDateTimeChanged(ev.target.value);
                }
            }

            _openCustomDateRangeDialog() {
                // Create a modal dialog for custom date range selection
                this._showCustomDateRangeModal();
            }

            _showCustomDateRangeModal() {
                const self = this;
                
                // Create modal HTML
                const modalHTML = `
                    <div class="modal fade" id="customDateRangeModal" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Özel Tarih Aralığı Seçin</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="startDate" class="form-label">Başlangıç Tarihi</label>
                                        <input type="date" id="startDate" class="form-control">
                                    </div>
                                    <div class="mb-3">
                                        <label for="endDate" class="form-label">Bitiş Tarihi</label>
                                        <input type="date" id="endDate" class="form-control">
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                                    <button type="button" class="btn btn-primary" id="applyCustomRange">Uygula</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Add modal to body
                document.body.insertAdjacentHTML('beforeend', modalHTML);
                
                // Show modal
                const modal = new bootstrap.Modal(document.getElementById('customDateRangeModal'));
                modal.show();

                // Handle apply button click
                document.getElementById('applyCustomRange').addEventListener('click', function() {
                    const startDate = document.getElementById('startDate').value;
                    const endDate = document.getElementById('endDate').value;
                    
                    if (startDate && endDate) {
                        const customRange = {
                            start: startDate,
                            end: endDate,
                            type: 'custom'
                        };
                        self.props.onDateTimeChanged(customRange);
                        modal.hide();
                    } else {
                        alert('Lütfen başlangıç ve bitiş tarihlerini seçin.');
                    }
                });

                // Clean up modal when hidden
                document.getElementById('customDateRangeModal').addEventListener('hidden.bs.modal', function() {
                    document.getElementById('customDateRangeModal').remove();
                });
            }
        }
);
