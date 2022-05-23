import * as Heket from 'heket'
import * as Did from '../../../domain/did/did'

const genericABNFString: string = `
  did                = "did:" methodname ":" methodspecificid
  methodname        = 1*methodchar
  methodchar        = %x61-7A / DIGIT
  methodspecificid = *( *idchar ":" ) 1*idchar
  idchar             = ALPHA / DIGIT / "." / "-" / "_" / pctencoded
  pctencoded        = "%" HEXDIG HEXDIG
`
const genericABNFParser: Heket.Parser = Heket.createParser(genericABNFString)

const indyABNFString: string = `
  did                = "did:indy:" namespace nsidstring
  namespace          = namestring (":" namestring) ":"
  namestring         = lowercase *(lowercase / DIGIT / "_" / "-")
  lowercase          = %x61-7A ; a-z
  nsidstring         = 21*22(base58char)
  base58char         = "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" / "A" / "B" / "C"
                     / "D" / "E" / "F" / "G" / "H" / "J" / "K" / "L" / "M" / "N" / "P" / "Q"
                     / "R" / "S" / "T" / "U" / "V" / "W" / "X" / "Y" / "Z" / "a" / "b" / "c"
                     / "d" / "e" / "f" / "g" / "h" / "i" / "j" / "k" / "m" / "n" / "o" / "p"
                     / "q" / "r" / "s" / "t" / "u" / "v" / "w" / "x" / "y" / "z"
`
const indyABNFParser: Heket.Parser = Heket.createParser(indyABNFString)

export const DidParserFactory = (type: Did.Type): Did.DidParser => {
  switch (type) {
    case Did.Type.Generic:
      return genericDidParser
    case Did.Type.Indy:
      return indyDidParser
    default:
      return genericDidParser
  }
}

const genericDidParser = (didString: string): Did.GenericDid => {
  // Must allow for the possibility that no Match object is returned
  // or else TypeScript compiler won't allow me to access later.
  const match: Heket.Match | undefined = abnfParse(genericABNFParser, didString)

  // Optional chaining to ensure the Match was assigned in the Try block above.
  // Nullish coalescing to return a default string if result is 'undefined' or 'null'.
  const name: string = match?.get('methodname') ?? 'empty' // TODO: 'empty' is surely the wrong default string
  const id: string = match?.get('methodspecificid') ?? 'empty'
  return {
    methodName: name,
    methodSpecificId: id
  }
}

const indyDidParser = (didString: string): Did.IndyDid => {
  // Must allow for the possibility that no Match object is returned
  // or else TypeScript compiler won't allow me to access later.
  const match: Heket.Match | undefined = abnfParse(indyABNFParser, didString)
  const name: string = 'indy'

  // Optional chaining to ensure the Match was assigned in the Try block above.
  // Nullish coalescing to return a default string if result is 'undefined' or 'null'.
  const namespace: string = match?.get('namespace') ?? 'empty' // TODO: 'empty' is surely the wrong default string
  const id: string = match?.get('nsidstring') ?? 'empty'
  return {
    methodName: name,
    methodSpecificId: id,
    indyNamespace: namespace
  }
}

const abnfParse = (parser: Heket.Parser, rawString: string): Heket.Match | undefined => {
  try {
    return parser.parse(rawString)
  } catch (e) {
    if (e instanceof Error) { throw new Did.MalformedDidError(e.message) }
  }
}
