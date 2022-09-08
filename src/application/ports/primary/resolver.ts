import { Resolver as resolver } from '../../../domain/core/resolver'

// Just a restatement of the interface defined in the domain, nothing fancier for now.
// All references to this in the infrastructure should point here rather than the domain.
export type Resolver = resolver
