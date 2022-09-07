import { Did, DidDocument } from '../../../domain/core'
import { Resolver } from '../../ports/inbound/resolve'

const makeResolveDid =
  (resolver: Resolver) =>
    async (did: Did): Promise<DidDocument> => {
      return await resolver.resolve(did)
    }

export default makeResolveDid
