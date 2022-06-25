import { DidScheme } from '../didScheme/didScheme'

export enum MethodType {
  Core = 'CORE',
  Indy = 'INDY'
}

export interface Did {
  readonly methodType: MethodType // asldfkjsalkdfjalskdfjlaskdfjlaskdfjlsakdfjlksadjflksadjflksadjflksadjflksajdflksajdflksajdflkasdfjsaldkaslkdfjaslkdfjdaslkjfdsalkasdfjlk
  readonly scheme: DidScheme
}
