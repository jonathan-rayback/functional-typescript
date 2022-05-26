import * as Heket from 'heket'
import { multi, method } from '@arrows/multimethod'
import * as Did from '../../../domain/did/did'
import { matchABNF } from '../../lib/parsers/abnf'

type DidParser = (didString: string) => Did.Did
type DidParserErrorHandler = (errorMessage: string) => void

const coreDidParser: DidParser = (didString: string): Did.CoreDid => {
  // Must allow for the possibility that no Match object is returned
  // or else TypeScript compiler won't allow me to access later.
  let match: Heket.Match | undefined
  try {
    match = matchABNF(Did.Type.Core, didString)
  } catch (e) {
    if (e instanceof Error) coreDidParseErrorHandler(e.message)
  }

  // Optional chaining to ensure the Match was assigned in the Try block above.
  // Nullish coalescing to return a default string if result is 'undefined' or 'null'.
  const name: string = match?.get('methodname') ?? 'empty' // TODO: 'empty' is surely the wrong default string
  const id: string = match?.get('methodspecificid') ?? 'empty'
  return {
    methodName: name,
    methodSpecificId: id
  }
}

const coreDidParseErrorHandler: DidParserErrorHandler = (message: string): void => {
  throw new Did.MalformedCoreDidError(message)
}

const indyDidParser: DidParser = (didString: string): Did.IndyDid => {
  // Must allow for the possibility that no Match object is returned
  // or else TypeScript compiler won't allow me to access later.
  let match: Heket.Match | undefined
  try {
    match = matchABNF(Did.Type.Indy, didString)
  } catch (e) {
    if (e instanceof Error) indyDidParseErrorHandler(e.message)
  }

  const name: string = 'indy'

  // Optional chaining to ensure the Match was assigned in the Try block above.
  // Nullish coalescing to return a default string if result is 'undefined' or 'null'.
  const namespace: string = match?.get('namespace') ?? 'empty' // TODO: 'empty' is surely the wrong default string
  const id: string = match?.get('nsidstring') ?? 'empty'
  return {
    methodName: name,
    methodSpecificId: id,
    indyNamespace: namespace
  }
}

const indyDidParseErrorHandler: DidParserErrorHandler = (message: string): void => {
  throw new Did.MalformedIndyDidError(message)
}

export const ParseDid = (type: Did.Type, didString: string): Did.Did => {
  // This multi-method lets me change which parser to send the DID string to based
  // on the DID type passed in.
  return multi(
    () => type,
    method(Did.Type.Core, coreDidParser),
    method(Did.Type.Indy, indyDidParser)
  )(didString)
}
