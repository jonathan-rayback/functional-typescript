import { Type, ParsedDid } from '../../../domain/did/did'
import { MalformedCoreDidError } from '../../../domain/did/core/ParsedCoreDid'
import { MalformedIndyDidError } from '../../../domain/did/indy/ParsedIndyDid'
import { matchABNF } from '../../lib/parsers/abnf'
import { multi, method } from '@arrows/multimethod'

// includes type guard to ensure a ParsedDid is returned
export const ParseDid = (type: Type, didString: string): ParsedDid => {
  const parsedDid = parseDid(type, didString)
  if (typeof parsedDid === 'object') return parsedDid
  return { // in the case there was an error parsing the DID
    methodName: 'error',
    methodSpecificId: 'error'
  }
}

// Not guaranteed to return a ParsedDid (in error case)
const parseDid = (type: Type, didString: string): ParsedDid | undefined => {
  try {
    return matchABNF(type, didString)
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
}
