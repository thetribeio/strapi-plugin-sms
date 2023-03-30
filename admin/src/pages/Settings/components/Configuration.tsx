/* eslint-disable no-useless-escape */

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Flex, Grid, GridItem, Typography, TextInput, Select, Option } from '@strapi/design-system';
import getTrad from '../../../utils/getTrad';

const Configuration = ({ config }) => {
  const { formatMessage } = useIntl();

  return (
    <Flex direction="column" alignItems="stretch" gap={4}>
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Typography variant="delta" as="h2">
          {formatMessage({
            id: getTrad('Settings.sms.plugin.title.config'),
            defaultMessage: 'Configuration',
          })}
        </Typography>
        <Typography>
          {formatMessage(
            {
              id: getTrad('Settings.sms.plugin.text.configuration'),
              defaultMessage:
                'The plugin is configured through the {file} file.',
            },
            {
              file: './config/plugins.js',
            }
          )}
        </Typography>
      </Flex>
      <Grid gap={5}>
        <GridItem col={6} s={12}>
          <TextInput
            name="shipper-sms"
            label={formatMessage({
              id: getTrad('Settings.sms.plugin.label.defaultSender'),
              defaultMessage: 'Default sender SMS',
            })}
            placeholder={formatMessage({
              id: getTrad('Settings.sms.plugin.placeholder.defaultSender'),
              defaultMessage: "Strapi",
            })}
            disabled
            onChange={() => {}}
            value={config.settings.defaultSender}
          />
        </GridItem>
        <GridItem col={6} s={12}>
          <Select
            name="sms-provider"
            label={formatMessage({
              id: getTrad('Settings.sms.plugin.label.provider'),
              defaultMessage: 'SMS provider',
            })}
            disabled
            onChange={() => {}}
            value={config.provider}
          >
            <Option value={config.provider}>{config.provider}</Option>
          </Select>
        </GridItem>
      </Grid>
    </Flex>
  );
};

Configuration.propTypes = {
  config: PropTypes.shape({
    provider: PropTypes.string,
    settings: PropTypes.shape({
      defaultSender: PropTypes.string,
    }),
  }).isRequired,
};

export default Configuration;
