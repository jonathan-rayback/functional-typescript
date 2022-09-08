import { IndyFactory } from '../domain/dids/factories/indyFactory'
import { Application } from '../application/application'
import { IndyResolver } from './adapters/primary/resolvers/indyResolver'
import { Sovrin } from './adapters/secondary/ledgers/indy/sovrin'

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
