import { validateDidString } from '../domain/domain'
import MakeParseDid from '../application/lib/didParsers/parseDid'
import MakeResolveDid from '../application/useCases/resolveDid/resolveDid'
import DidResolver from './didResolvers/simulatedAsyncDidResolver'
import IndyParser from '../application/lib/didParsers/parsers/indyParser'

const main = (): void => {
  const indyDidString = validateDidString(
    'did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9'
  )

  const parseIndyDid = MakeParseDid(IndyParser)
  const ResolveDid = MakeResolveDid(DidResolver)

  if (indyDidString !== undefined) {
    const indyDid = parseIndyDid(indyDidString)

    ResolveDid(indyDid).then(
      (didDocument) => {
        console.log(didDocument)
      },
      (error) => {
        return error // just stubbing this out for now
      }
    )
    console.log(indyDid)
  }
}

main()
