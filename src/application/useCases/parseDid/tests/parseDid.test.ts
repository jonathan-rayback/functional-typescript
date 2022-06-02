import { Type, ParsedDid } from '../../../../domain/did/did'
import { ParsedCoreDid, MalformedCoreDidError } from '../../../../domain/did/core/ParsedCoreDid'
import { ParsedIndyDid, MalformedIndyDidError } from '../../../../domain/did/indy/ParsedIndyDid'
import * as ParseDid from '../parseDid'

test('Can parse well-formed core DID', () => {
  const coreDidString = 'did:abc:12345'
  const coreDid: ParsedCoreDid = parseDid(Type.Core, coreDidString)
  expect(coreDid.methodName).toBe('abc')
  expect(coreDid.methodSpecificId).toBe('12345')
})

test('Malformed core DID throws error', () => {
  const malformedCoreDidString = 'dd:abc:12345'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const genericDid: ParsedCoreDid = parseDid(Type.Core, malformedCoreDidString)
  }).toThrow(MalformedCoreDidError)
})

test('Alternate malformed core DID throws error', () => {
  const malformedCoreDidString = 'did:abc:12345*!@#$(&)'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const genericDid: ParsedCoreDid = parseDid(Type.Core, malformedCoreDidString)
  }).toThrow(MalformedCoreDidError)
})

test('Can parse well-formed Indy Did with no subspace', () => {
  const indyDidString = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSMB'
  // Set 'Partial' since the compiler can't guarantee all fields required
  // in IndyDid are being returned by the DidParser returned by the factory.
  // In this case, we do check that all fields are coming back below.
  const indyDid: Partial<ParsedIndyDid> = parseDid(Type.Indy, indyDidString)
  expect(indyDid.methodName).toBe('indy')
  expect(indyDid.indyNamespace).toBe('sovrin:') // Indy DID spec requires the last character of the namespace to be ':'
  expect(indyDid.methodSpecificId).toBe('6cgbu8ZPoWTnR5Rv5JcSMB')
})

test('Can parse well-formed Indy Did with subspace', () => {
  const indyDidString = 'did:indy:sovrin:staging:6cgbu8ZPoWTnR5Rv5JcSMB'
  const indyDid: Partial<ParsedIndyDid> = parseDid(Type.Indy, indyDidString)
  expect(indyDid.methodName).toBe('indy')
  expect(indyDid.indyNamespace).toBe('sovrin:staging:') // Indy DID spec requires the last character of the namespace to be ':'
  expect(indyDid.methodSpecificId).toBe('6cgbu8ZPoWTnR5Rv5JcSMB')
})

test('Mispelled method name in malformed Indy DID throws error', () => {
  const malformedIndyDidString = 'did:iny:sovrin:6cgbu8ZPoWTnR5Rv5JcSMB'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<ParsedIndyDid> = parseDid(Type.Indy, malformedIndyDidString)
  }).toThrow(MalformedIndyDidError)
})

test('No namespace in malformed Indy DID throws error', () => {
  const malformedIndyDidString = 'did:indy:6cgbu8ZPoWTnR5Rv5JcSMB'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<ParsedIndyDid> = parseDid(Type.Indy, malformedIndyDidString)
  }).toThrow(MalformedIndyDidError)
})

test('Non-Base-58 "0" char in malformed Indy DID with throws error', () => {
  const charToTest = '0'
  const indyDidStringWithIllegalBase58Char = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<ParsedIndyDid> = parseDid(Type.Indy, indyDidStringWithIllegalBase58Char)
  }).toThrow(MalformedIndyDidError)
})

test('Non-Base-58 "O" char in malformed Indy DID with throws error', () => {
  const charToTest = 'O'
  const indyDidStringWithIllegalBase58Char = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<ParsedIndyDid> = parseDid(Type.Indy, indyDidStringWithIllegalBase58Char)
  }).toThrow(MalformedIndyDidError)
})

test('Non-Base-58 "I" char in malformed Indy DID with throws error', () => {
  const charToTest = 'I'
  const indyDidStringWithIllegalBase58Char = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<ParsedIndyDid> = parseDid(Type.Indy, indyDidStringWithIllegalBase58Char)
  }).toThrow(MalformedIndyDidError)
})

test('Non-Base-58 "l" char in malformed Indy DID with throws error', () => {
  const charToTest = 'l'
  const indyDidStringWithIllegalBase58Char = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<ParsedIndyDid> = parseDid(Type.Indy, indyDidStringWithIllegalBase58Char)
  }).toThrow(MalformedIndyDidError)
})

const parseDid = (type: Type, didString: string): ParsedDid => {
  return ParseDid.ParseDid(type, didString)
}
