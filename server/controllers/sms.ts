import { pick } from 'lodash/fp'
import { errors } from '@strapi/utils'

const ApplicationError = errors.ApplicationError
export default ({ strapi }: { strapi: any }): any => ({
  async send(ctx: any) {
    const options = ctx.request.body

    try {
      await strapi.plugin('sms').service('sms').send(options)
    } catch (e: any) {
      if (e.statusCode === 400) {
        throw new ApplicationError(e.message)
      } else {
        throw new Error(`Couldn't send sms: ${e.message}.`)
      }
    }

    // Send 200 `ok`
    ctx.send({})
  },

  async test(ctx: any) {
    const { recipient } = ctx.request.body

    if (!recipient) {
      throw new ApplicationError('No recipient(s) are given')
    }

    const sms = {
      recipient: [recipient.trim()],
      message: `Great! You have correctly configured the Strapi sms plugin with the ${strapi.config.get(
        'plugin.sms.provider'
      )} provider.`
    }

    try {
      await strapi.plugin('sms').service('sms').send(sms)
    } catch (error: any) {
      if (error.statusCode === 400) {
        throw new ApplicationError(error.message)
      } else {
        throw new Error(`Couldn't send sms: ${error.message}.`)
      }
    }

    // Send 200 `ok`
    ctx.send({})
  },

  async getSettings(ctx: any) {
    const config = strapi.plugin('sms').service('sms').getProviderSettings()

    ctx.send({
      config: pick(
        ['provider', 'settings.defaultSender', 'settings.testPhoneNumber'],
        config
      )
    })
  }
})
