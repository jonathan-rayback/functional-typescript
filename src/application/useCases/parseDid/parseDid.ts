import * as Heket from 'heket'
import { multi, method } from '@arrows/multimethod'
import * as Did from '../../../domain/did/did'
import { matchABNF } from '../../lib/parsers/abnf'

type DidParser = (match: Heket.Match) => Did.Did

const coreDidParser: DidParser = (match: Heket.Match): Did.CoreDid => {
  // Optional chaining to ensure the Match was assigned in the Try block above.
  // Nullish coalescing to return a default string if result is 'undefined' or 'null'.
  const name: string = match?.get('methodname') ?? 'empty' // TODO: 'empty' is surely the wrong default string
  const id: string = match?.get('methodspecificid') ?? 'empty'
  return {
    methodName: name,
    methodSpecificId: id
  }
}

const indyDidParser: DidParser = (match: Heket.Match): Did.IndyDid => {
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

export const ParseDid = (type: Did.Type, didString: string): Did.Did => {
  // Must allow for the possibility that no Match object is returned
  // or else TypeScript compiler won't allow me to access later.
  let match: Heket.Match | undefined
  try {
    match = matchABNF(type, didString)
  } catch (e) {
    if (e instanceof Error) HandleError(type, e.message)
  }
  // This multi-method lets me change which parser to send the DID string to based
  // on the DID type passed in.
  return multi(
    () => type,
    method(Did.Type.Core, coreDidParser),
    method(Did.Type.Indy, indyDidParser)
  )(match)
}

const HandleError = (type: Did.Type, errorMessage: string): void => {
  multi(
    () => type,
    method(Did.Type.Core, (): void => { throw new Did.MalformedCoreDidError(errorMessage) }),
    method(Did.Type.Indy, (): void => { throw new Did.MalformedIndyDidError(errorMessage) })
  )()
}
