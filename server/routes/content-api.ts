export default {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/',
      handler: 'sms.send',
    },
  ],
};
