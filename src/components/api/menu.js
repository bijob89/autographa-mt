export const menus = [
    {
        name: 'Dashboard',
        roles: ['member', 'ad', 'sa'],
        key:'dashboard',
        child: [
            {
                name: 'List organisation',
                link: '/app/organisations',
                roles: ['member', 'ad', 'sa'],
                key:'organisations'
            },
            {
                name: 'List projects',
                link: '/app/projects',
                roles: ['member', 'ad', 'sa'],
                key: 'projects'
            },
            {
                name: 'List users',
                link: '/app/users',
                roles: ['member', 'ad', 'sa'],
                key: 'users'
            },

        ]
    },
    {
        name: 'Translations',
        roles: ['m', 'ad', 'sa'],
        key: 'translations',
        child: [
            {
                name: 'Sources',
                link: '/translations/sources',
                roles: ['m', 'ad', 'sa'],
                key: 'sources'
            },
            {
                name: 'My projects',
                link: '/app/translations/projects',
                roles: ['m', 'ad', 'sa'],
                key: 'my_projects'
            },
            {
                name: 'Download Draft',
                link: '/app/translations/download',
                roles: ['m', 'ad', 'sa'],
                key: 'download_draft'
            }
        ]
    },

]