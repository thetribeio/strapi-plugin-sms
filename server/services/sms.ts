import '@strapi/strapi'

declare global {
  var strapi: any
}

const getProviderSettings = () => {
  return strapi.config.get('plugin.sms')
}

const send = async (options) => {
  return strapi.plugin('sms').provider.send(options)
}

export default () => ({
  getProviderSettings,
  send
})
