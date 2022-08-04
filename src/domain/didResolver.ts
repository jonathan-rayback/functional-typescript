import Did from './dids/did'
import DidResolutionOptions from './didResolutionOptions'
import DidDocument from './didDocument'

// Spec for DID resolvers is found at https://www.w3.org/TR/did-core/#did-resolution
export default interface didResolver {
  resolve: (
    did: Did,
    resolutionOptions?: DidResolutionOptions
  ) => Promise<DidDocument>
}
