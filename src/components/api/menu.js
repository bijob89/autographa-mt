export const menus = [
    {
        name: 'Dashboard',
        roles: ['member', 'admin', 'super-admin'],
        key:'dashboard',
        child: [
            {
                name: 'List organisation',
                link: '/app/organisations',
                roles: ['member', 'admin', 'super-admin'],
                key:'organisations'
            },
            {
                name: 'List projects',
                link: '/app/projects',
                roles: ['member', 'admin', 'super-admin'],
                key: 'projects'
            },
            {
                name: 'List users',
                link: '/app/users',
                roles: ['member', 'admin', 'super-admin'],
                key: 'users'
            },

        ]
    },
    {
        name: 'Translations',
        roles: ['member', 'admin', 'super-admin'],
        key: 'translations',
        child: [
            {
                name: 'Sources',
                link: '/translations/sources',
                roles: ['member', 'admin', 'super-admin'],
                key: 'sources'
            },
            {
                name: 'Drafts',
                link: '/tranlsations/drafts',
                roles: ['member', 'admin', 'super-admin'],
                key: 'drafts'
            }
        ]
    },

]