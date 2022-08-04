import DidDocument from '../../../domain/didDocument'
import DidResolver from '../../../domain/didResolver'
import Did from '../../../domain/dids/did'

const makeResolveDid =
  (resolver: DidResolver) =>
    async (did: Did): Promise<DidDocument> => {
      return await resolver.resolve(did)
    }

export default makeResolveDid
