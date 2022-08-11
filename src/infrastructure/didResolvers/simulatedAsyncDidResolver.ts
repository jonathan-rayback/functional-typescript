import { DidDocument, DidResolver } from '../../domain/domain'

const simulatedAsyncDidResolver: DidResolver = {
  resolve: async (): Promise<DidDocument> => {
    const resolved = new Promise<DidDocument>((resolve, reject) => {
      // Simulate a trip to a remote VDR and back to resolve the DID
      setTimeout(() => {
        resolve({
          id: 'abcdef',
          key: '12345'
        })
      }, 4500)
    })
    return await resolved
  }
}

export default simulatedAsyncDidResolver
