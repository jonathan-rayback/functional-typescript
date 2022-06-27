import { MethodType } from '../../../../../domain/did/did'
import { ParsedDid } from '../../../../../domain/parsedDid/parsedDid'
import { ParsedIndyDid } from '../../../../../domain/parsedDid/indy/parsedIndyDid'
import { CreateABNFParser, ABNFDidParsingError } from '../abnfParser'

const parseCoreDid = CreateABNFParser(MethodType.Core)
const parseIndyDid = CreateABNFParser(MethodType.Indy)

test('Can parse well-formed default DID', () => {
  const didString = 'did:abc:12345'
  const parsedDid: ParsedDid = parseCoreDid(didString)
  expect(parsedDid.methodName).toBe('abc')
  expect(parsedDid.methodSpecificId).toBe('12345')
})

test('Malformed default DID string throws error during parsing', () => {
  const malformedDidString = 'dd:abc:12345'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: ParsedDid = parseCoreDid(malformedDidString)
  }).toThrow(ABNFDidParsingError)
})

test('Alternate malformed default DID string throws error during parsing', () => {
  const malformedDidString = 'did:abc:12345*!@#$(&)'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: ParsedDid = parseCoreDid(malformedDidString)
  }).toThrow(ABNFDidParsingError)
})

test('Can parse well-formed Indy Did string (no subspace)', () => {
  const didString = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSMB'
  // Set 'Partial' since the compiler can't guarantee all fields required
  // in IndyDid are being returned by the DidParser returned by the factory.
  // In this case, we do check that all fields are coming back below.
  const parsedDid: ParsedIndyDid = parseIndyDid(didString)
  expect(parsedDid.methodName).toBe('indy')
  expect(parsedDid.indyNamespace).toBe('sovrin:') // Indy DID spec requires the last character of the namespace to be ':'
  expect(parsedDid.methodSpecificId).toBe('6cgbu8ZPoWTnR5Rv5JcSMB')
})

test('Can parse well-formed Indy Did string (subspace)', () => {
  const didString = 'did:indy:sovrin:staging:6cgbu8ZPoWTnR5Rv5JcSMB'
  const parsedDid: ParsedIndyDid = parseIndyDid(didString)
  expect(parsedDid.methodName).toBe('indy')
  expect(parsedDid.indyNamespace).toBe('sovrin:staging:') // Indy DID spec requires the last character of the namespace to be ':'
  expect(parsedDid.methodSpecificId).toBe('6cgbu8ZPoWTnR5Rv5JcSMB')
})

test('Mispelled method name in malformed Indy DID string throws error while parsing', () => {
  const malformedDidString = 'did:iny:sovrin:6cgbu8ZPoWTnR5Rv5JcSMB'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: ParsedIndyDid = parseIndyDid(malformedDidString)
  }).toThrow(ABNFDidParsingError)
})

test('No namespace in malformed Indy DID string throws error while parsing', () => {
  const malformedDidString = 'did:indy:6cgbu8ZPoWTnR5Rv5JcSMB'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: ParsedIndyDid = parseIndyDid(malformedDidString)
  }).toThrow(ABNFDidParsingError)
})

test('Non-Base-58 "0" char in malformed Indy DID string throws error while parsing', () => {
  const charToTest = '0'
  const indyDidStringWithIllegalBase58Char =
    'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: ParsedIndyDid = parseIndyDid(
      indyDidStringWithIllegalBase58Char
    )
  }).toThrow(ABNFDidParsingError)
})

test('Non-Base-58 "O" char in malformed Indy DID string throws error while parsing', () => {
  const charToTest = 'O'
  const indyDidStringWithIllegalBase58Char =
    'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: ParsedIndyDid = parseIndyDid(
      indyDidStringWithIllegalBase58Char
    )
  }).toThrow(ABNFDidParsingError)
})

test('Non-Base-58 "I" char in malformed Indy DID string throws error while parsing', () => {
  const charToTest = 'I'
  const indyDidStringWithIllegalBase58Char =
    'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: ParsedIndyDid = parseIndyDid(
      indyDidStringWithIllegalBase58Char
    )
  }).toThrow(ABNFDidParsingError)
})

test('Non-Base-58 "l" char in malformed Indy DID string throws error while parsing', () => {
  const charToTest = 'l'
  const indyDidStringWithIllegalBase58Char =
    'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: ParsedIndyDid = parseIndyDid(
      indyDidStringWithIllegalBase58Char
    )
  }).toThrow(ABNFDidParsingError)
})
