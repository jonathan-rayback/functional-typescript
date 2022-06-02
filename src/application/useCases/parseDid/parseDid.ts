import { Type, ParsedDid } from '../../../domain/did/did'
import { MalformedCoreDidError } from '../../../domain/did/core/ParsedCoreDid'
import { MalformedIndyDidError } from '../../../domain/did/indy/ParsedIndyDid'
import { matchABNF } from '../../lib/parsers/abnf'
import { multi, method } from '@arrows/multimethod'

export const ParseDid = (type: Type, didString: string): ParsedDid => {
  // I don't love this bogus ParsedDid object...better way to type guard?
  let parsedDid: ParsedDid = {
    methodName: 'Error',
    methodSpecificId: 'Error'
  }
  try {
    parsedDid = matchABNF(type, didString)
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = e.message
      multi(
        () => type,
        method(Type.Core, (): void => { throw new MalformedCoreDidError(errorMessage) }),
        method(Type.Indy, (): void => { throw new MalformedIndyDidError(errorMessage) })
      )()
    }
  }
  return parsedDid
}
