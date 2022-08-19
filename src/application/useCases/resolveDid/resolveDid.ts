import { CoreDid, DidDocument, DidResolver } from '../../../domain/domain'

const makeResolveDid =
  (resolver: DidResolver) =>
    async (did: CoreDid): Promise<DidDocument> => {
      return await resolver.resolve(did)
    }

export default makeResolveDid
