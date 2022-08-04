import MethodType from '../domain/methodType'
import ParseDidFactory from '../application/useCases/parseDid/parseDid'
import ResolveDid from '../application/useCases/resolveDid/resolveDid'
import SimlatedDidResolver from './didResolvers/simulatedAsyncDidResolver'

const main = (): void => {
  const coreDidString = 'did:key:123456jysh2'
  const indyDidString = 'did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9'

  const parseDefaultDid = ParseDidFactory(MethodType.DEFAULT)
  const parseIndyDid = ParseDidFactory(MethodType.INDY)

  console.log(parseDefaultDid(coreDidString))
  console.log(parseIndyDid(indyDidString))

  ResolveDid(SimlatedDidResolver).then(
    (didDocument) => {
      console.log(didDocument)
    },
    () => {}
  )
}

main()
