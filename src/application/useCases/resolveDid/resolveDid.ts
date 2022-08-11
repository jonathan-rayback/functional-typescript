import { Did, DidDocument, DidResolver } from '../../../domain/domain'

const makeResolveDid =
  (resolver: DidResolver) =>
    async (did: Did): Promise<DidDocument> => {
      return await resolver.resolve(did)
    }

export default makeResolveDid
