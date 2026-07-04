# -*- coding: utf-8 -*-
{
    'name': 'No Quick Create',
    'summary': 'Restrict Quick Create / Edit in relational fields to authorised users',
    'description': """
No Quick Create
===============
Adds a group **Allow Quick Create / Edit** (odooer_no_quick_create.group_allow_quick_create).

* Administrators (base.group_erp_manager) are implicitly members.
* Other users must be added to the group manually.
* Users NOT in the group will not see "Create …" or "Create and edit …"
  options in any Many2one / Many2many autocomplete dropdown.
    """,
    'version': '19.0.1.0.0',
    'category': 'Technical',
    'license': 'LGPL-3',
    'author': 'chitswe',
    'website': 'https://github.com/odooer-io/odooer_no_quick_create',
    'depends': ['web'],
    'data': [
        'data/group.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'odooer_no_quick_create/static/src/no_quick_create.js',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
}
