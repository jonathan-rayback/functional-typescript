import { validateDidString } from '../domain/domain'
import MakeParseDid from '../application/lib/didParsers/parseDid'
// import MakeResolveDid from '../application/useCases/resolveDid/resolveDid'
// import DidResolver from './didResolvers/simulatedAsyncDidResolver'
import IndyParser from '../application/lib/didParsers/parsers/indyParser'

const main = (): void => {
  const indyDidString = validateDidString(
    'did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9'
  )
  const invalidDidString = validateDidString('abc')

  const parseIndyDid = MakeParseDid(IndyParser)

  // const ResolveDid = MakeResolveDid(DidResolver)

  const indyDid =
    indyDidString !== undefined
      ? parseIndyDid(indyDidString)
      : { did: 'undefined' }

  const invalidDid =
    invalidDidString !== undefined
      ? parseIndyDid(invalidDidString)
      : { did: 'undefined' }

  console.log(indyDid)
  console.log(invalidDid)

  //   ResolveDid(defaultDid).then(
  //     (didDocument) => {
  //       console.log(didDocument)
  //     },
  //     (error) => {
  //       return error // just stubbing this out for now
  //     }
  //   )
}

main()
