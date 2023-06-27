
declare global {
  const strapi: any
}

const getProviderSettings = (): any => {
  return strapi.config.get('plugin.sms')
}

const send = async (options: any): Promise<any> => {
  return strapi.plugin('sms').provider.send(options)
}

export default (): {
  getProviderSettings: () => any
  send: (options: any) => Promise<any>
} => ({
  getProviderSettings,
  send
})
