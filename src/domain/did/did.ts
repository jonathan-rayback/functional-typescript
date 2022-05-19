import * as Heket from 'heket'

export interface Did {
  methodName: string
  methodSpecificId: string
}

// type DidParser = {
//   (parseRules: string) => void

// }

export const CheckDidSyntax = (rawDid: string): void => {
  const BaseABNFParsingRules = `
  did               = "did:" method-name ":" method-specific-id
  method-name        = 1*method-char
  method-char        = %x61-7A / DIGIT
  method-specific-id = *( *idchar ":" ) 1*idchar
  idchar             = ALPHA / DIGIT / "." / "-" / "_" / pct-encoded
  pct-encoded        = "%" HEXDIG HEXDIG
`
  const parser = Heket.createParser(BaseABNFParsingRules)
  try {
    parser.parse(rawDid)
  } catch (e) {
    if (e instanceof Error) { throw new MalformedDidError(e.message) }
  }
}
// export class Did {
//   public readonly method: string
//   public readonly identifier: string

//   constructor (rawDid: string) {
//     const didParts = this.parseRawDid(rawDid)
//     this.method = didParts[1]
//     this.identifier = didParts[2]
//   }

//   private readonly parseRawDid = (rawDid: string): string[] => {
//     this.checkDidSyntax(rawDid)
//     const didParts = rawDid.split(':')
//     return didParts
//   }

//   // Formal ABNF syntax from DID spec
//   private readonly checkDidSyntax = (rawDid: string): void => {
//     const parser = Heket.createParser(`
//       did               = "did:" method-name ":" method-specific-id
//       method-name        = 1*method-char
//       method-char        = %x61-7A / DIGIT
//       method-specific-id = *( *idchar ":" ) 1*idchar
//       idchar             = ALPHA / DIGIT / "." / "-" / "_" / pct-encoded
//       pct-encoded        = "%" HEXDIG HEXDIG
//     `)
//     try {
//       parser.parse(rawDid)
//     } catch (e) {
//       if (e instanceof Error) { throw new MalformedDidError(e.message) }
//     }
//   }
// }

export class MalformedDidError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'MalformedDidError'
  }
}
