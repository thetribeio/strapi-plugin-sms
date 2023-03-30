import { getFetchClient } from '@strapi/helper-plugin';

const fetchSMSSettings = async () => {
  const { get } = getFetchClient();
  const { data } = await get('/sms/settings');

  return data.config;
};

const postSMSTest = async (body) => {
  const { post } = getFetchClient();

  await post('/sms/test', body);
};

export { fetchSMSSettings, postSMSTest };
