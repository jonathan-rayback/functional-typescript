import { Type, ParsedDid } from '../../../domain/did/did'
import { coreABNFString, MakeParsedCoreDid } from '../../../domain/did/core/ParsedCoreDid'
import { indyABNFString, MakeParsedIndyDid } from '../../../domain/did/indy/ParsedIndyDid'
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
      const methodName = match?.get('methodname') ?? 'empty' // TODO: 'empty' is surely the wrong default string
      const methodSpecificId = match?.get('methodspecificid') ?? 'empty'
      return MakeParsedCoreDid(methodName, methodSpecificId)
    }),
    method(Type.Indy, () => {
      const parser = createParser(indyABNFString)
      const match = parser.parse(rawString)
      const methodName = 'indy'
      const indyNamespace = match?.get('namespace') ?? 'empty'
      const methodSpecificId = match?.get('nsidstring') ?? 'empty'
      return MakeParsedIndyDid(methodName, indyNamespace, methodSpecificId)
    })
  )()
}
