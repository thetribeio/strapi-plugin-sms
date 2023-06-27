import { type AnyObject, type Maybe } from 'yup/lib/types'

declare module 'yup' {
  interface StringSchema<TType extends Maybe<string> = string | undefined, TContext extends AnyObject = AnyObject, TOut extends TType = TType, T extends string | null | undefined = string | undefined, C = AnyObject> {
    phone(): this
  }
}
