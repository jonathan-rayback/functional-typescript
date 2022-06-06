import { Type, DidScheme } from '../../../domain/did/did'
import { MalformedCoreDidSchemeError } from '../../../domain/did/core/CoreDidScheme'
import { MalformedIndyDidSchemeError } from '../../../domain/did/indy/IndyDidScheme'
import { ParseDidSchemeByABNF } from '../../lib/parsers/abnfParser'
import { multi, method } from '@arrows/multimethod'

// includes type guard to ensure a ParsedDid is returned
export const ParseDidScheme = (type: Type, didString: string): DidScheme => {
  const parsedDid = parseDidScheme(type, didString)
  if (typeof parsedDid === 'object') return parsedDid
  return { // in the case there was an error parsing the DID, use this dummy scheme, there is no valid case for this to occur.
    methodName: 'error',
    methodSpecificId: 'error'
  }
}

// Not guaranteed to return a ParsedDid (in error case)
const parseDidScheme = (type: Type, didString: string): DidScheme | undefined => {
  try {
    return ParseDidSchemeByABNF(type, didString)
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = e.message
      multi(
        () => type,
        method(Type.Core, (): void => { throw new MalformedCoreDidSchemeError(errorMessage) }),
        method(Type.Indy, (): void => { throw new MalformedIndyDidSchemeError(errorMessage) })
      )()
    }
  }
}
