import { MethodType } from '../../../domain/did/did'
import { DidScheme } from '../../../domain/didScheme/didScheme'
import { MalformedCoreDidSchemeError } from '../../../domain/did/core/CoreDid'
import { MalformedIndyDidSchemeError } from '../../../domain/did/indy/IndyDid'
import { ParseDidSchemeByABNF } from '../../lib/parsers/abnfParser'
import { multi, method } from '@arrows/multimethod'

// includes type guard to ensure a ParsedDid is returned
export const ParseDidScheme = (
  type: MethodType,
  didString: string
): DidScheme => {
  const parsedDid = parseDidScheme(type, didString)
  if (typeof parsedDid === 'object') return parsedDid
  return {
    // in the case there was an error parsing the DID, use this dummy scheme, there is no valid case for this to occur.
    methodName: 'error',
    methodSpecificId: 'error'
  }
}

// Not guaranteed to return a ParsedDid (in error case)
const parseDidScheme = (
  type: MethodType,
  didString: string
): DidScheme | undefined => {
  try {
    return ParseDidSchemeByABNF(type, didString)
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = e.message
      multi(
        () => type,
        method(MethodType.Core, (): void => {
          throw new MalformedCoreDidSchemeError(errorMessage)
        }),
        method(MethodType.Indy, (): void => {
          throw new MalformedIndyDidSchemeError(errorMessage)
        })
      )()
    }
  }
}
