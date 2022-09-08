import { IndyDid } from '../../../../domain/dids/indy'
import { IndyDidDocument } from '../../../../domain/didDocuments/indyDidDocument'
import { Ledger } from '../../../../application/ports/secondary/ledger'

const MOCKED_INDY_DID_DOCUMENT = JSON.stringify({
  id: 'abcdef',
  data: '12345'
}) as IndyDidDocument

export const MockLedger: Ledger = {
  name: 'Mock',
  lookup: async (did: IndyDid): Promise<IndyDidDocument> => {
    console.log(`Looking up ${did} on a mock network...`)
    return await new Promise((resolve, reject) => {
      resolve(MOCKED_INDY_DID_DOCUMENT)
    })
  }
}
