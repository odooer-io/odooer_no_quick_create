# -*- coding: utf-8 -*-
from odoo import models, api
from odoo.http import request


class IrHttp(models.AbstractModel):
    _inherit = 'ir.http'

    @api.model
    def session_info(self):
        res = super().session_info()
        session_uid = request.session.uid
        res.setdefault('groups', {})
        res['groups']['odooer_no_quick_create.group_allow_quick_create'] = (
            self.env.user.has_group('odooer_no_quick_create.group_allow_quick_create')
            if session_uid else False
        )
        return res
