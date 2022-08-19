import { validateDidString, ValidDidString } from '../domain/domain'
import MakeParseDid from '../application/lib/didParsers/parseDid'
// import MakeResolveDid from '../application/useCases/resolveDid/resolveDid'
// import DidResolver from './didResolvers/simulatedAsyncDidResolver'
import CoreDidParser from '../application/lib/didParsers/parsers/coreParser'
import IndyParser from '../application/lib/didParsers/parsers/indyParser'

const main = (): void => {
  const coreDidString = validateDidString(
    'did:key:123456jysh2'
  ) as ValidDidString
  const indyDidString = validateDidString(
    'did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9'
  ) as ValidDidString
  const invalidDidString = validateDidString('abc') as ValidDidString

  const parseDefaultDid = MakeParseDid(CoreDidParser)
  const parseIndyDid = MakeParseDid(IndyParser)

  // const ResolveDid = MakeResolveDid(DidResolver)

  const defaultDid =
    coreDidString !== undefined
      ? parseDefaultDid(coreDidString)
      : { did: 'undefined' }

  const indyDid =
    indyDidString !== undefined
      ? parseIndyDid(indyDidString)
      : { did: 'undefined' }

  const invalidDid =
    invalidDidString !== undefined
      ? parseDefaultDid(invalidDidString)
      : { did: 'undefined' }

  console.log(defaultDid)
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
