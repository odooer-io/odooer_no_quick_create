/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { Many2XAutocomplete } from "@web/views/fields/relational_utils";
import { useService } from "@web/core/utils/hooks";
import { onWillStart } from "@odoo/owl";

const GROUP = "odooer_no_quick_create.group_allow_quick_create";

patch(Many2XAutocomplete.prototype, {
    setup() {
        super.setup();
        // Group membership is pre-cached in session — no extra RPC needed.
        const user = useService("user");
        this._allowQuickCreate = false;
        onWillStart(async () => {
            this._allowQuickCreate = await user.hasGroup(GROUP);
        });
    },

    /** "Create X" quick-create option — hide for users without the group. */
    addCreateSuggestion(params) {
        if (!this._allowQuickCreate) {
            return false;
        }
        return super.addCreateSuggestion(params);
    },

    /** "Create and edit…" / "Create…" option — hide for users without the group. */
    addCreateEditSuggestion(params) {
        if (!this._allowQuickCreate) {
            return false;
        }
        return super.addCreateEditSuggestion(params);
    },
});
