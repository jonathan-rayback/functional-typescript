import * as Heket from 'heket'
import * as Did from '../../../domain/did/did'

const GenericDidABNF = `
  did                = "did:" method-name ":" method-specific-id
  method-name        = 1*method-char
  method-char        = %x61-7A / DIGIT
  method-specific-id = *( *idchar ":" ) 1*idchar
  idchar             = ALPHA / DIGIT / "." / "-" / "_" / pct-encoded
  pct-encoded        = "%" HEXDIG HEXDIG
`

const GenericDidParser = Heket.createParser(GenericDidABNF)

export const ParseGenericDid = (type: Did.Type, didString: string): Did.Did => {
  switch (type) {
    case Did.Type.Generic:
      CheckGenericDid(didString)
  }
  return CreateGenericDid(didString)
}

const CheckGenericDid: Did.DidChecker = (didString: string): void => {
  try {
    GenericDidParser.parse(didString)
  } catch (e) {
    if (e instanceof Error) { throw new Did.MalformedDidError(e.message) }
  }
}

const CreateGenericDid = (didString: string): Did.Did => {
  const match = GenericDidParser.parse(didString)
  // for some reson it appears that the Heket library transforms '-' into '_' :( !
  const name: string = match.get('method_name') ?? 'empty' // TODO: 'empty' is surely the wrong string to return if match is null
  const id: string = match.get('method_specific_id') ?? 'empty'
  return {
    methodName: name,
    methodSpecificId: id
  }
}

export const ParseIndyDid = (type: Did.Type, didString: string): Did.IndyDid => {
  switch (type) {
    case Did.Type.Indy:
      CheckIndyDid(didString)
  }
  return CreateIndyDid(didString)
}

const IndyDidABNF = `
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
const IndyDidParser = Heket.createParser(IndyDidABNF)

const CheckIndyDid: Did.DidChecker = (didString: string): void => {
  try {
    IndyDidParser.parse(didString)
  } catch (e) {
    if (e instanceof Error) { throw new Did.MalformedDidError(e.message) }
  }
}

const CreateIndyDid = (didString: string): Did.IndyDid => {
  const match = IndyDidParser.parse(didString)
  // for some reson it appears that the Heket library transforms '-' into '_' :( !
  const name: string = 'indy' // TODO: 'empty' is surely the wrong string to return if match is null
  const namespace: string = match.get('namespace') ?? 'empty'
  const id: string = match.get('nsidstring') ?? 'empty'
  return {
    methodName: name,
    methodSpecificId: id,
    indyNamespace: namespace
  }
}
