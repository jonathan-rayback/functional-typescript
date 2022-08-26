import { makeIndyDid } from '../domain/dids/IndyDid'
import MakeResolveDid from '../application/ports/resolveDid/resolveDid'
import DidResolver from '../application/adapters/primary/resolvers/indyResolver'

const main = (): void => {
  const did = makeIndyDid('did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9')
  const ResolveDid = MakeResolveDid(DidResolver)
  console.log(did)
  if (did !== undefined) {
    ResolveDid(did).then(
      (didDocument) => {
        console.log(JSON.parse(didDocument))
      },
      (error) => {
        return error // just stubbing this out for now
      }
    )
    console.log(did)
  }
}

main()
