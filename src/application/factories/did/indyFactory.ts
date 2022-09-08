import { IndyDid } from '../../../domain/dids/indy'
import { IndyValidator } from '../../../domain/validators/indyValidator'
import { DidFactory } from './factory'

export const IndyFactory: DidFactory = (
  didString: string
): IndyDid | undefined => {
  return IndyValidator.isValid(didString) ? (didString as IndyDid) : undefined
}
