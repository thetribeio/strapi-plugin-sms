import * as yup from 'yup'
import { translatedErrors } from '@strapi/helper-plugin'
import { PhoneNumberUtil } from 'google-libphonenumber'

const phoneUtilInstance = PhoneNumberUtil.getInstance()

yup.addMethod(yup.string, 'phone', function () {
  return this.test('phone', translatedErrors.phoneNumber, (value) => {
    const phoneNumberObject = phoneUtilInstance.parse(value)

    return phoneUtilInstance.isValidNumber(phoneNumberObject)
  })
})

const schema = yup.object().shape({
  phoneNumber: yup.string().phone().required(translatedErrors.required)
})

export default schema
