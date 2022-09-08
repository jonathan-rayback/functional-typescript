import { IndyDid } from '../../../../../domain/dids/indy'
import { IndyDidDocument } from '../../../../../domain/didDocuments/indyDidDocument'
import { Ledger } from '../../../../../application/ports/secondary/ledger'

const MOCKED_INDY_DID_DOCUMENT = JSON.stringify({
  id: 'abcdef',
  data: '12345'
}) as IndyDidDocument

export const Sovrin: Ledger = {
  name: 'Sovrin',
  lookup: async (did: IndyDid): Promise<IndyDidDocument> => {
    console.log(`Looking up ${did} on the Sovrin Network...`)
    return await new Promise((resolve, reject) => {
      resolve(MOCKED_INDY_DID_DOCUMENT)
    })
  }
}
