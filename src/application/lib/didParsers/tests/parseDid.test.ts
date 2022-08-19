// import methodType from '../../../../domain/didMethodTypes'
import { IndyDid, ValidDidString } from '../../../../domain/domain'
import MakeParseDid, { DidParsingError } from '../parseDid'
import IndyParser from '../parsers/indyParser'

const parseIndyDid = MakeParseDid(IndyParser)

test('Can parse well-formed Indy Did string (no subspace)', () => {
  const didString = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSMB' as ValidDidString
  // Set 'Partial' since the compiler can't guarantee all fields required
  // in IndyDid are being returned by the DidParser returned by the factory.
  // In this case, we do check that all fields are coming back below.
  const parsedDid: IndyDid = parseIndyDid(didString) as IndyDid
  expect(parsedDid.methodName).toBe('indy')
  expect(parsedDid.indyNamespace).toBe('sovrin:') // Indy DID spec requires the last character of the namespace to be ':'
  expect(parsedDid.methodSpecificId).toBe('6cgbu8ZPoWTnR5Rv5JcSMB')
})

test('Can parse well-formed Indy Did string (subspace)', () => {
  const didString =
    'did:indy:sovrin:staging:6cgbu8ZPoWTnR5Rv5JcSMB' as ValidDidString
  const parsedDid: IndyDid = parseIndyDid(didString) as IndyDid
  expect(parsedDid.methodName).toBe('indy')
  expect(parsedDid.indyNamespace).toBe('sovrin:staging:') // Indy DID spec requires the last character of the namespace to be ':'
  expect(parsedDid.methodSpecificId).toBe('6cgbu8ZPoWTnR5Rv5JcSMB')
})

test('Mispelled method name in malformed Indy DID string throws error while parsing', () => {
  const malformedDidString =
    'did:iny:sovrin:6cgbu8ZPoWTnR5Rv5JcSMB' as ValidDidString
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: IndyDid = parseIndyDid(malformedDidString) as IndyDid
  }).toThrow(DidParsingError)
})

test('No namespace in malformed Indy DID string throws error while parsing', () => {
  const malformedDidString =
    'did:indy:6cgbu8ZPoWTnR5Rv5JcSMB' as ValidDidString
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: IndyDid = parseIndyDid(malformedDidString) as IndyDid
  }).toThrow(DidParsingError)
})

test('Non-Base-58 "0" char in malformed Indy DID string throws error while parsing', () => {
  const charToTest = '0'
  const indyDidStringWithIllegalBase58Char =
    ('did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest) as ValidDidString
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: Partial<IndyDid> = parseIndyDid(
      indyDidStringWithIllegalBase58Char
    )
  }).toThrow(DidParsingError)
})

test('Non-Base-58 "O" char in malformed Indy DID string throws error while parsing', () => {
  const charToTest = 'O'
  const indyDidStringWithIllegalBase58Char =
    ('did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest) as ValidDidString
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: Partial<IndyDid> = parseIndyDid(
      indyDidStringWithIllegalBase58Char
    )
  }).toThrow(DidParsingError)
})

test('Non-Base-58 "I" char in malformed Indy DID string throws error while parsing', () => {
  const charToTest = 'I'
  const indyDidStringWithIllegalBase58Char =
    ('did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest) as ValidDidString
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: Partial<IndyDid> = parseIndyDid(
      indyDidStringWithIllegalBase58Char
    )
  }).toThrow(DidParsingError)
})

test('Non-Base-58 "l" char in malformed Indy DID string throws error while parsing', () => {
  const charToTest = 'l'
  const indyDidStringWithIllegalBase58Char =
    ('did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest) as ValidDidString
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedDid: Partial<IndyDid> = parseIndyDid(
      indyDidStringWithIllegalBase58Char
    )
  }).toThrow(DidParsingError)
})