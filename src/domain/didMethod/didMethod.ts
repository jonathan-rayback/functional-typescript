import { Did } from '../did/did'
import { DidDocument } from '../didDocument/didDocument'

export interface DidMethod {
  // Not sure what the actual method names/signatures should be for a general-purpose did method interface yet.
  // This is a placeholder for now.
  readonly create: () => Did
  readonly resolve: (did: Did) => DidDocument
  readonly update: (did: Did) => DidDocument
  readonly deactivate: (did: Did) => void
}
