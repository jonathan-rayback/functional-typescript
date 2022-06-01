// THE GOAL RIGHT NOW IS TO GET ANY REFERENCE TO HEKET OUT OF HERE AND CONTAIN IT IN THE ABNF LIBRARY.
// I THINK THE PROBLEM I'M HITTING UP AGAINST IS THAT MY MODEL OF A DID OBJECT IS TOO SIMPLE. THE PARSED
// SEGMENTS OF A DID _MIGHT_ BE A PART OF IT, BUT MAYBE NOT. FOCUS ON MODELING OUT THE DID OBJECT REALLY WELL
// FIRST.
import { Type, ParsedDid } from '../../../domain/did/did'
import { ParsedCoreDid, MalformedCoreDidError } from '../../../domain/did/core/ParsedCoreDid'
import { ParsedIndyDid, MalformedIndyDidError } from '../../../domain/did/indy/ParsedIndyDid'
import { matchABNF } from '../../lib/parsers/abnf'
import { Match } from 'heket'
import { multi, method } from '@arrows/multimethod'

type DidParser = (match: Match) => ParsedDid

const coreDidParser: DidParser = (match: Match): ParsedCoreDid => {
  // Optional chaining to ensure the Match was assigned in the Try block above.
  // Nullish coalescing to return a default string if result is 'undefined' or 'null'.
  const name: string = match?.get('methodname') ?? 'empty' // TODO: 'empty' is surely the wrong default string
  const id: string = match?.get('methodspecificid') ?? 'empty'
  return {
    methodName: name,
    methodSpecificId: id
  }
}

const indyDidParser: DidParser = (match: Match): ParsedIndyDid => {
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

export const ParseDid = (type: Type, didString: string): ParsedDid => {
  // Must allow for the possibility that no Match object is returned
  // or else TypeScript compiler won't allow me to access later.
  let match: Match | undefined
  try {
    match = matchABNF(type, didString)
  } catch (e) {
    if (e instanceof Error) HandleError(type, e.message)
  }
  // This multi-method lets me change which parser to send the DID string to based
  // on the DID type passed in.
  return multi(
    () => type,
    method(Type.Core, coreDidParser),
    method(Type.Indy, indyDidParser)
  )(match)
}

const HandleError = (type: Type, errorMessage: string): void => {
  multi(
    () => type,
    method(Type.Core, (): void => { throw new MalformedCoreDidError(errorMessage) }),
    method(Type.Indy, (): void => { throw new MalformedIndyDidError(errorMessage) })
  )()
}
