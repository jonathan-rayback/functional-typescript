import * as Heket from 'heket'
import * as Did from '../../../domain/did/did'

export const ParseDid = (rawDid: string): Did.Did => {
  return CheckDidSyntax(rawDid)
}

const CheckDidSyntax: Did.DidChecker = (rawDid: string): Did.Did => {
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
    const match = parser.parse(rawDid)
    // for some reson it appears that the Heket library transforms '-' into '_' :( !
    const name: string = match.get('method_name') ?? 'empty' // TODO: 'empty' is surely the wrong string to return if match is null
    const id: string = match.get('method_specific_id') ?? 'empty'
    return {
      methodName: name,
      methodSpecificId: id
    }
  } catch (e) {
    if (e instanceof Error) { throw new Did.MalformedDidError(e.message) }
  }
  // should never get here because of try/catch block
  return {
    methodName: '',
    methodSpecificId: ''
  }
}
