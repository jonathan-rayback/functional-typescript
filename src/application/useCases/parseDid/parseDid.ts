import * as Heket from 'heket'
import * as Did from '../../../domain/did/did'

export const ParseDid = (rawDid: string): Did.Did => {
  CheckDidSyntax(rawDid)
  const didParts = rawDid.split(':')
  return {
    methodName: didParts[1],
    methodSpecificId: didParts[2]
  }
}

const CheckDidSyntax: Did.DidChecker = (rawDid: string): void => {
  const ABNFParsingRules = `
  did               = "did:" method-name ":" method-specific-id
  method-name        = 1*method-char
  method-char        = %x61-7A / DIGIT
  method-specific-id = *( *idchar ":" ) 1*idchar
  idchar             = ALPHA / DIGIT / "." / "-" / "_" / pct-encoded
  pct-encoded        = "%" HEXDIG HEXDIG
`
  const parser = Heket.createParser(ABNFParsingRules)
  try {
    parser.parse(rawDid)
  } catch (e) {
    if (e instanceof Error) { throw new Did.MalformedDidError(e.message) }
  }
}
