/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { Many2XAutocomplete } from "@web/views/fields/relational_utils";
import { user } from "@web/core/user";

const GROUP = "odooer_no_quick_create.group_allow_quick_create";

// Resolved once at module load from the pre-cached session value — no RPC.
let _allowQuickCreate = false;
user.hasGroup(GROUP).then((v) => {
    _allowQuickCreate = v;
});

patch(Many2XAutocomplete.prototype, {
    /** "Create X" quick-create option — hide for users without the group. */
    addCreateSuggestion(params) {
        if (!_allowQuickCreate) {
            return false;
        }
        return super.addCreateSuggestion(params);
    },

    /** "Create and edit…" / "Create…" option — hide for users without the group. */
    addCreateEditSuggestion(params) {
        if (!_allowQuickCreate) {
            return false;
        }
        return super.addCreateEditSuggestion(params);
    },
});

