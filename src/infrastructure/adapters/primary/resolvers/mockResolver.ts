import { IndyDidDocument } from '../../../../domain/didDocuments/indyDidDocument'
import { Resolver } from '../../../../application/ports/primary/resolver'
import { Ledger } from '../../../../application/ports/secondary/ledger'

const MOCKED_INDY_DID_DOCUMENT = JSON.stringify({
  id: 'abcdef',
  data: '12345'
}) as IndyDidDocument

export const MockResolver = (ledger: Ledger): Resolver => {
  return {
    resolve: async (did, resolutionOptions?): Promise<IndyDidDocument> => {
      console.log(`Mock resolving Did: ${did} on ${ledger.name} ledger`)
      const resolved = new Promise<IndyDidDocument>((resolve, reject) => {
        resolve(MOCKED_INDY_DID_DOCUMENT)
      })
      return await resolved
    }
  }
}
