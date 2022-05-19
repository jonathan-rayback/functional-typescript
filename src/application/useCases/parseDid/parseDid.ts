import * as Did from '../../../domain/did/did'

export const ParseDid = (rawDid: string): Did.Did => {
  Did.CheckDidSyntax(rawDid)
  const didParts = rawDid.split(':')
  return {
    methodName: didParts[1],
    methodSpecificId: didParts[2]
  }
}
