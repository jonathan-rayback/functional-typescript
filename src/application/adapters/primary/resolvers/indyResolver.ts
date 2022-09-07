import { DidDocument } from '../../../../domain/core'
import { Resolver } from '../../../ports/inbound/resolve'

const indyResolver: Resolver = {
  resolve: async (did, resolutionOptions?): Promise<DidDocument> => {
    console.log(`Resolving Did: ${did}`)
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
