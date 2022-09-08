import { Validator } from './validator'

export const DidValidator: Validator = {
  isValid: (didString: string): boolean => {
    const re =
      /^did:[a-z0-9]+:(([A-Z.a-z0-9]|-|_|%[0-9A-Fa-f][0-9A-Fa-f])*:)*([A-Z.a-z0-9]|-|_|%[0-9A-Fa-f][0-9A-Fa-f])+$/
    return re.test(didString)
  }
}
