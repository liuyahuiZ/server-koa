module.exports = [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      routes: [
        // dashboard
        { path: '/', redirect: '/dashboard/analysis' },
        {
          path: '/dashboard',
          name: 'dashboard',
          icon: 'dashboard',
          routes: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              component: './Dashboard/Analysis',
            },
            {
              path: '/dashboard/monitor',
              name: 'monitor',
              component: './Dashboard/Monitor',
            },
            {
              path: '/dashboard/workplace',
              name: 'workplace',
              component: './Dashboard/Workplace',
            },
          ],
        },
        //   system
        {
          name: 'system',
          icon: 'setting',
          path: '/system',
          authority: ['admin'],
          routes: [
            {
              path: '/system/users',
              name: 'users',
              component: './System/Users/Users',
              routes: [
                {
                  path: '/account/center',
                  redirect: '/system/users/articles',
                },
                {
                  path: '/account/center/articles',
                  component: './System/Users/Articles',
                },
                {
                  path: '/account/center/applications',
                  component: './System/Users/Applications',
                },
                {
                  path: '/account/center/projects',
                  component: './System/Users/Projects',
                },
              ],
            },
            {
              path: '/system/menu',
              name: 'menu',
              component: './System/Menu/Menu',
              routes: [
                {
                  path: '/account/settings',
                  redirect: '/system/menu/base',
                },
                {
                  path: '/account/settings/base',
                  component: './System/Menu/BaseView',
                },
                {
                  path: '/account/settings/security',
                  component: './System/Menu/SecurityView',
                },
                {
                  path: '/account/settings/binding',
                  component: './System/Menu/BindingView',
                },
                {
                  path: '/account/settings/notification',
                  component: './System/Menu/NotificationView',
                },
              ],
            },
          ],
        },
        {
          component: '404',
        },
      ],
    },
  ];