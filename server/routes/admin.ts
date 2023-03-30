export default {
  type: 'admin',
  routes: [
    {
      method: 'POST',
      path: '/',
      handler: 'sms.send',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'POST',
      path: '/test',
      handler: 'sms.test',
      config: {
        policies: [
          'admin::isAuthenticatedAdmin',
          { name: 'admin::hasPermissions', config: { actions: ['plugin::sms.settings.read'] } },
        ],
      },
    },
    {
      method: 'GET',
      path: '/settings',
      handler: 'sms.getSettings',
      config: {
        policies: [
          'admin::isAuthenticatedAdmin',
          { name: 'admin::hasPermissions', config: { actions: ['plugin::sms.settings.read'] } },
        ],
      },
    },
  ],
};
