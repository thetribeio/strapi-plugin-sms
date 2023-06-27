import React from 'react'
import { useIntl } from 'react-intl'
import { SettingsPageTitle } from '@strapi/helper-plugin'
import { HeaderLayout } from '@strapi/design-system'
import getTrad from '../../../utils/getTrad'

const EmailHeader = (): JSX.Element => {
  const { formatMessage } = useIntl()

  return (
    <>
      <SettingsPageTitle
        name={formatMessage({
          id: getTrad('Settings.sms.plugin.title'),
          defaultMessage: 'Configuration'
        })}
      />
      <HeaderLayout
        id="title"
        title={formatMessage({
          id: getTrad('Settings.sms.plugin.title'),
          defaultMessage: 'Configuration'
        })}
        subtitle={formatMessage({
          id: getTrad('Settings.sms.plugin.subTitle'),
          defaultMessage: 'Test the settings for the SMS plugin'
        })}
      />
    </>
  )
}

export default EmailHeader
