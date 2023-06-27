import { getFetchClient } from '@strapi/helper-plugin'

const fetchSMSSettings = async (): Promise<any> => {
  const { get } = getFetchClient()
  const { data } = await get('/sms/settings')

  return data.config
}

const postSMSTest = async (body): Promise<void> => {
  const { post } = getFetchClient()

  await post('/sms/test', body)
}

export { fetchSMSSettings, postSMSTest }
