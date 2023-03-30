import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
  getYupInnerErrors,
  CheckPagePermissions,
  useNotification,
  LoadingIndicatorPage,
  useOverlayBlocker,
  useFocusWhenNavigate,
} from '@strapi/helper-plugin';
import {
  Main,
  ContentLayout,
  Box,
  Grid,
  GridItem,
  Typography,
  TextInput,
  Button,
  Flex,
  useNotifyAT,
} from '@strapi/design-system';
import { Envelop } from '@strapi/icons';
import Configuration from './components/Configuration';
import schema from '../../utils/schema';
import pluginPermissions from '../../permissions';
import { fetchSMSSettings, postSMSTest } from './utils/api';
import SMSHeader from './components/SMSHeader';
import getTrad from '../../utils/getTrad';

const ProtectedSettingsPage = () => (
  <CheckPagePermissions permissions={pluginPermissions.settings}>
    <SettingsPage />
  </CheckPagePermissions>
);

const SettingsPage = () => {
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const { lockApp, unlockApp } = useOverlayBlocker();
  const { notifyStatus } = useNotifyAT();
  useFocusWhenNavigate();

  const [formErrors, setFormErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testPhoneNumber, setTestPhoneNumber] = useState('');
  const [isTestPhoneNumberValid, setIsTestPhoneNumberValid] = useState(false);
  const [config, setConfig] = useState({
    provider: '',
    settings: { defaultSender: '', testPhoneNumber: '' },
  });

  useEffect(() => {
    setIsLoading(true);

    fetchSMSSettings()
      .then((config) => {
        notifyStatus(
          formatMessage({
            id: getTrad('Settings.sms.plugin.notification.data.loaded'),
            defaultMessage: 'SMS settings data has been loaded',
          })
        );

        setConfig(config);

        const testPhoneNumberFound = config?.settings?.testPhoneNumber;

        if (testPhoneNumberFound) {
          setTestPhoneNumber(testPhoneNumberFound);
        }
      })
      .catch(() =>
        toggleNotification({
          type: 'warning',
          message: formatMessage({
            id: getTrad('Settings.sms.plugin.notification.config.error'),
            defaultMessage: 'Failed to retrieve the SMS config',
          }),
        })
      )
      .finally(() => setIsLoading(false));
  }, [formatMessage, toggleNotification, notifyStatus]);

  useEffect(() => {
    if (formErrors.phoneNumber) {
      const input = document.querySelector('#test-number-input') as HTMLInputElement;
      input.focus();
    }
  }, [formErrors]);

  useEffect(() => {
    schema
      .validate({ phoneNumber: testPhoneNumber }, { abortEarly: false })
      .then(() => setIsTestPhoneNumberValid(true))
      .catch(() => setIsTestPhoneNumberValid(false));
  }, [testPhoneNumber]);

  const handleChange = (e) => {
    setTestPhoneNumber(() => e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await schema.validate({ phoneNumber: testPhoneNumber }, { abortEarly: false });

      setIsSubmitting(true);
      lockApp();

      postSMSTest({ recipient: testPhoneNumber })
        .then(() => {
          toggleNotification({
            type: 'success',
            message: formatMessage(
              {
                id: getTrad('Settings.sms.plugin.notification.test.success'),
                defaultMessage: 'SMS test succeeded, check the {recipient} text messages',
              },
              { recipient: testPhoneNumber }
            ),
          });
        })
        .catch(() => {
          toggleNotification({
            type: 'warning',
            message: formatMessage(
              {
                id: getTrad('Settings.sms.plugin.notification.test.error'),
                defaultMessage: 'Failed to send a test SMS to {recipient}',
              },
              { recipient: testPhoneNumber }
            ),
          });
        })
        .finally(() => {
          setIsSubmitting(false);
          unlockApp();
        });
    } catch (error) {
      setFormErrors(getYupInnerErrors(error));
    }
  };

  if (isLoading) {
    return (
      <Main labelledBy="title" aria-busy="true">
        <SMSHeader />
        <ContentLayout>
          <LoadingIndicatorPage />
        </ContentLayout>
      </Main>
    );
  }

  return (
    <Main labelledBy="title" aria-busy={isSubmitting}>
      <SMSHeader />
      <ContentLayout>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" alignItems="stretch" gap={7}>
            <Box
              background="neutral0"
              hasRadius
              shadow="filterShadow"
              paddingTop={6}
              paddingBottom={6}
              paddingLeft={7}
              paddingRight={7}
            >
              <Configuration config={config} />
            </Box>
            <Box
              background="neutral0"
              hasRadius
              shadow="filterShadow"
              paddingTop={6}
              paddingBottom={6}
              paddingLeft={7}
              paddingRight={7}
            >
              <Flex direction="column" alignItems="stretch" gap={4}>
                <Typography variant="delta" as="h2">
                  {formatMessage({
                    id: getTrad('Settings.sms.plugin.title.test'),
                    defaultMessage: 'Test sms delivery',
                  })}
                </Typography>
                <Grid gap={5} alignItems="end">
                  <GridItem col={6} s={12}>
                    <TextInput
                      id="test-number-input"
                      name="test-number"
                      onChange={handleChange}
                      label={formatMessage({
                        id: getTrad('Settings.sms.plugin.label.testPhoneNumber'),
                        defaultMessage: 'Recipient phone number (international format)',
                      })}
                      value={testPhoneNumber}
                      error={
                        formErrors.phoneNumber?.id &&
                        formatMessage({
                          id: getTrad(`${formErrors.phoneNumber?.id}`),
                          defaultMessage: 'This is an invalid phone number',
                        })
                      }
                      placeholder={formatMessage({
                        id: getTrad('Settings.sms.plugin.placeholder.testPhoneNumber'),
                        defaultMessage: '+33600000000',
                      })}
                    />
                  </GridItem>
                  <GridItem col={7} s={12}>
                    <Button
                      loading={isSubmitting}
                      disabled={!isTestPhoneNumberValid}
                      type="submit"
                      startIcon={<Envelop />}
                    >
                      {formatMessage({
                        id: getTrad('Settings.sms.plugin.button.test-sms'),
                        defaultMessage: 'Send test sms',
                      })}
                    </Button>
                  </GridItem>
                </Grid>
              </Flex>
            </Box>
          </Flex>
        </form>
      </ContentLayout>
    </Main>
  );
};

export default ProtectedSettingsPage;
