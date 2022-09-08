import { Did } from './did'
import { DidDocument } from './didDocument'
import { DidResolutionOptions } from './resolutionOptions'

// Spec for DID resolvers is found at https://www.w3.org/TR/did-core/#did-resolution

export type Resolver = {
  readonly resolve: (
    did: Did,
    resolutionOptions?: DidResolutionOptions
  ) => Promise<DidDocument>
}
