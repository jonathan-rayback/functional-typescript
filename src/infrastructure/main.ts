import { Did, DidMethodType } from '../domain/domain'
import MakeParseDid from '../application/lib/didParsers/parseDid'
import MakeResolveDid from '../application/useCases/resolveDid/resolveDid'
import DidResolver from './didResolvers/simulatedAsyncDidResolver'
import CoreDidParser from '../application/lib/didParsers/parsers/coreParser'
import IndyParser from '../application/lib/didParsers/parsers/indyParser'

const main = (): void => {
  const coreDidString = 'did:key:123456jysh2'
  const indyDidString = 'did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9'

  const parseDefaultDid = MakeParseDid(CoreDidParser)
  const parseIndyDid = MakeParseDid(IndyParser)

  const ResolveDid = MakeResolveDid(DidResolver)

  const defaultDid: Did = {
    methodType: DidMethodType.DEFAULT,
    parsedDid: parseDefaultDid(coreDidString)
  }

  const indyDid: Did = {
    methodType: DidMethodType.INDY,
    parsedDid: parseIndyDid(indyDidString)
  }

  console.log(defaultDid)
  console.log(indyDid)

  ResolveDid(defaultDid).then(
    (didDocument) => {
      console.log(didDocument)
    },
    (error) => {
      return error // just stubbing this out for now
    }
  )
}

main()
