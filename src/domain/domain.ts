export type Did = IndyDid

export type ValidDidString = string & {
  __brand: 'Valid Did String'
}

// This is a library function that validates a Did string. Perhaps it goes in some sort of library static class or a different file?
export const validateDidString = (
  input: string
): ValidDidString | undefined => {
  const re =
    /^did:[a-z0-9]+:(([A-Z.a-z0-9]|-|_|%[0-9A-Fa-f][0-9A-Fa-f])*:)*([A-Z.a-z0-9]|-|_|%[0-9A-Fa-f][0-9A-Fa-f])+$/
  return re.test(input) ? (input as ValidDidString) : undefined
}

// so now the question is how to constrain raw dids, method names and method specific ids to be typed beyond string
type CoreDid = {
  readonly raw: ValidDidString
  readonly methodName: string
  readonly methodSpecificId: string
}

export type IndyDid = {
  readonly indyNamespace: string
} & CoreDid

export type DidDocument = {
  readonly id: string
  readonly key: string
}

export type DidParser = {
  readonly parse: (didString: ValidDidString) => Did
}

export type DidResolutionOptions = {
  readonly accept: string
}

// Spec for DID resolvers is found at https://www.w3.org/TR/did-core/#did-resolution
export type DidResolver = {
  readonly resolve: (
    did: Did,
    resolutionOptions?: DidResolutionOptions
  ) => Promise<DidDocument>
}
