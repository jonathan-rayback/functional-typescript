import { DidDocument } from '../../../../domain/core/didDocument'
import { Ledger } from '../../../../application/ports/secondary/ledger'
import { Resolver } from '../../../../application/ports/primary/resolver'

export const IndyResolver = (ledger: Ledger): Resolver => {
  return {
    resolve: async (did, options?): Promise<DidDocument> => {
      console.log(`Resolving Did: ${did} on ${ledger.name} ledger`)
      const resolved = new Promise<DidDocument>((resolve, reject) => {
        // Simulate a trip to a remote VDR and back to resolve the DID
        setTimeout(() => {
          resolve(
            JSON.stringify({
              id: 'abcdef',
              data: '12345'
            }) as DidDocument
          )
        }, 4500)
      })
      return await resolved
    }
  }
}
