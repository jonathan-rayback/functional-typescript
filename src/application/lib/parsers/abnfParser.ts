import { Type, DidScheme } from '../../../domain/did/did'
import { coreABNFString, MakeCoreDidScheme } from '../../../domain/did/core/CoreDidScheme'
import { indyABNFString, MakeIndyDidScheme } from '../../../domain/did/indy/IndyDidScheme'
import { createParser } from 'heket'
import { multi, method } from '@arrows/multimethod'

export const ParseDidSchemeByABNF = (type: Type, rawString: string): DidScheme => {
  return multi(
    () => type,
    method(Type.Core, () => {
      const parser = createParser(coreABNFString)
      const match = parser.parse(rawString)
      const methodName = match?.get('methodname') ?? 'empty' // TODO: 'empty' is surely the wrong default string
      const methodSpecificId = match?.get('methodspecificid') ?? 'empty'
      return MakeCoreDidScheme(methodName, methodSpecificId)
    }),
    method(Type.Indy, () => {
      const parser = createParser(indyABNFString)
      const match = parser.parse(rawString)
      const methodName = 'indy'
      const indyNamespace = match?.get('namespace') ?? 'empty'
      const methodSpecificId = match?.get('nsidstring') ?? 'empty'
      return MakeIndyDidScheme(methodName, indyNamespace, methodSpecificId)
    })
  )()
}
