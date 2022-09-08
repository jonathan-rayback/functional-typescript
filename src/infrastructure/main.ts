import { IndyFactory } from '../application/factories/did/indyFactory'
import { IndyResolver } from '../application/adapters/primary/resolvers/indyResolver'
import { Application } from '../application/application'
import { Sovrin } from '../application/adapters/secondary/ledgers/indy/sovrin'

const main = (): void => {
  const did = IndyFactory('did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9')
  const app: Application = IndyResolver(Sovrin)
  console.log(did)
  if (did !== undefined) {
    app.resolve(did).then(
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
