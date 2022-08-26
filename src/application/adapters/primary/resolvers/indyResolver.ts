import { DidDocument } from '../../../../domain/core'
import { DidResolver } from '../../../../domain/didResolver'

const indyResolver: DidResolver = {
  resolve: async (): Promise<DidDocument> => {
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

export default indyResolver
