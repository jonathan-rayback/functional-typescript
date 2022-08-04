import DidDocument from '../../../domain/didDocuments/didDocument'
import DidResolver from '../resolveDid/didResolver'

const resolveDid = async (resolver: DidResolver): Promise<DidDocument> => {
  return await resolver.resolveDid()
}

export default resolveDid
