# Strapi plugin sms

A quick description of sms.

## Install

Install this package in your Strapi project.

```sh
yarn add @thetribe/strapi-plugin-sms
```

## Configure

You need to enable the plugin in you strapi project. 

In `config/plugins.js`:
```js
{
    // other plugins configuration
    sms: {
        enabled: true,
        config: {
            // sms- provider configuration
        }
    }
}
```


After re-building admin panel (`yarn build` in your Strapi project), you should have a SMS section in admin panel settings.

It will show you the configuration of the plugin.

## Provider

This plugin does not export a default provider.

You should add a sms provider such as https://github.com/thetribeio/strapi-provider-sms-smsenvoi
