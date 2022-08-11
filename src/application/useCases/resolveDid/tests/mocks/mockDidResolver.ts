import { DidResolver, DidDocument } from '../../../../../domain/domain'

const MOCKED_DID_DOCUMENT = {
  id: 'abcdef',
  key: '12345'
}

const mockForTestResolver: DidResolver = {
  resolve: async (): Promise<DidDocument> => {
    const resolved = new Promise<DidDocument>((resolve, reject) => {
      resolve(MOCKED_DID_DOCUMENT)
    })
    return await resolved
  }
}

export default mockForTestResolver
