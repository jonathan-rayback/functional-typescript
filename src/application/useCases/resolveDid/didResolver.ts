import DidDocument from '../../../domain/didDocuments/didDocument'

export default interface didResolver {
  resolveDid: () => Promise<DidDocument>
}
