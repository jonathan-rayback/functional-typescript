import { Type as DidType } from '../../../domain/did/did'
import { coreABNFString } from '../../../domain/did/core/ParsedCoreDid'
import { indyABNFString } from '../../../domain/did/indy/ParsedIndyDid'
import { createParser, Match } from 'heket'
import { multi, method } from '@arrows/multimethod'

export const matchABNF = (didType: DidType, rawString: string): Match | undefined => {
  const parser = createParser(getABNF(didType))
  try {
    return parser.parse(rawString)
  } catch (e) {
    if (e instanceof Error) throw e
  }
}

const getABNF = multi(
  method(DidType.Core, coreABNFString),
  method(DidType.Indy, indyABNFString)
)
