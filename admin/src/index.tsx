import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import getTrad from './utils/getTrad';
import pluginPermissions from './permissions';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: { id: getTrad('SettingsNav.section-label'), defaultMessage: 'SMS Plugin' },
      },
      [
        {
          intlLabel: {
            id: getTrad('Settings.email.plugin.title'),
            defaultMessage: 'Settings',
          },
          id: 'settings',
          to: `/settings/${pluginId}`,
          async Component() {
            const component = await import(
              /* webpackChunkName: "sms-settings-page" */ './pages/Settings'
            );

            return component;
          },
          permissions: pluginPermissions.settings,
        },
      ]
    );
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap() {},
  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
