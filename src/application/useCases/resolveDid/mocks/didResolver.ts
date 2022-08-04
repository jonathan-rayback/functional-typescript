import DidResolver from '../didResolver'
import DidDocument from '../../../../domain/didDocuments/didDocument'

const MOCKED_DID_DOCUMENT = {
  id: 'abcdef',
  key: '12345'
}

const mockForTestResolver: DidResolver = {
  resolveDid: async (): Promise<DidDocument> => {
    const resolved = new Promise<DidDocument>((resolve, reject) => {
      resolve(MOCKED_DID_DOCUMENT)
    })
    return await resolved
  }
}

export default mockForTestResolver
