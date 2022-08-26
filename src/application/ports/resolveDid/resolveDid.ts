import { Did, DidDocument } from '../../../domain/core'
import { DidResolver } from '../../../domain/didResolver'

const makeResolveDid =
  (resolver: DidResolver) =>
    async (did: Did): Promise<DidDocument> => {
      return await resolver.resolve(did)
    }

export default makeResolveDid
