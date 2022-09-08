import { IndyDid } from '../indy'
import { IndyValidator } from '../../validators/indyValidator'
import { DidFactory } from './factory'

export const IndyFactory: DidFactory = (
  didString: string
): IndyDid | undefined => {
  return IndyValidator.isValid(didString) ? (didString as IndyDid) : undefined
}
