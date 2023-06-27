const createProvider = (smsConfig): any => {
  const providerName = smsConfig.provider?.toLowerCase()
  let provider

  let modulePath
  try {
    modulePath = require.resolve(`strapi-provider-sms-${providerName}`)
  } catch (e: any) {
    if (e.code === 'MODULE_NOT_FOUND') {
      modulePath = providerName
    } else {
      throw e
    }
  }

  try {
    provider = require(modulePath)
  } catch (e) {
    throw new Error(`Could not load sms provider ${providerName}`)
  }

  return provider.init(smsConfig.providerOptions, smsConfig.settings)
}

export default async ({ strapi }: { strapi: any }): Promise<any> => {
  // bootstrap phase
  const smsConfig = strapi.config.get('plugin.sms')
  strapi.plugin('sms').provider = createProvider(smsConfig)

  const actions = [
    {
      section: 'settings',
      category: 'sms',
      displayName: 'Access the SMS settings page',
      uid: 'settings.read',
      pluginName: 'sms'
    }
  ]

  await strapi.admin.services.permission.actionProvider.registerMany(actions)
}
