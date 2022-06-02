import { Type, ParsedDid } from '../../../domain/did/did'
import { coreABNFString } from '../../../domain/did/core/ParsedCoreDid'
import { indyABNFString } from '../../../domain/did/indy/ParsedIndyDid'
import { createParser } from 'heket'
import { multi, method } from '@arrows/multimethod'

// const getABNF = multi(
//   method(Type.Core, coreABNFString),
//   method(Type.Indy, indyABNFString)
// )

export const matchABNF = (type: Type, rawString: string): ParsedDid => {
  return multi(
    () => type,
    method(Type.Core, () => {
      const parser = createParser(coreABNFString)
      const match = parser.parse(rawString)
      return {
        methodName: match?.get('methodname') ?? 'empty', // TODO: 'empty' is surely the wrong default string
        methodSpecificId: match?.get('methodspecificid') ?? 'empty'
      }
    }),
    method(Type.Indy, () => {
      const parser = createParser(indyABNFString)
      const match = parser.parse(rawString)
      return {
        methodName: 'indy',
        indyNamespace: match?.get('namespace') ?? 'empty',
        methodSpecificId: match?.get('nsidstring') ?? 'empty'
      }
    })
  )()
}
