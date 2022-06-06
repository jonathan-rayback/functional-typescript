import { Type } from '../../../../domain/did/did'
import { CoreDidScheme, MalformedCoreDidSchemeError } from '../../../../domain/did/core/CoreDidScheme'
import { IndyDidScheme, MalformedIndyDidSchemeError } from '../../../../domain/did/indy/IndyDidScheme'
import { ParseDidScheme } from '../parseDidScheme'

test('Can parse well-formed core DID', () => {
  const coreDidString = 'did:abc:12345'
  const coreDid: CoreDidScheme = ParseDidScheme(Type.Core, coreDidString)
  expect(coreDid.methodName).toBe('abc')
  expect(coreDid.methodSpecificId).toBe('12345')
})

test('Malformed core DID throws error', () => {
  const malformedCoreDidString = 'dd:abc:12345'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const genericDid: CoreDidScheme = ParseDidScheme(Type.Core, malformedCoreDidString)
  }).toThrow(MalformedCoreDidSchemeError)
})

test('Alternate malformed core DID throws error', () => {
  const malformedCoreDidString = 'did:abc:12345*!@#$(&)'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const genericDid: CoreDidScheme = ParseDidScheme(Type.Core, malformedCoreDidString)
  }).toThrow(MalformedCoreDidSchemeError)
})

test('Can parse well-formed Indy Did with no subspace', () => {
  const indyDidString = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSMB'
  // Set 'Partial' since the compiler can't guarantee all fields required
  // in IndyDid are being returned by the DidParser returned by the factory.
  // In this case, we do check that all fields are coming back below.
  const indyDid: Partial<IndyDidScheme> = ParseDidScheme(Type.Indy, indyDidString)
  expect(indyDid.methodName).toBe('indy')
  expect(indyDid.indyNamespace).toBe('sovrin:') // Indy DID spec requires the last character of the namespace to be ':'
  expect(indyDid.methodSpecificId).toBe('6cgbu8ZPoWTnR5Rv5JcSMB')
})

test('Can parse well-formed Indy Did with subspace', () => {
  const indyDidString = 'did:indy:sovrin:staging:6cgbu8ZPoWTnR5Rv5JcSMB'
  const indyDid: Partial<IndyDidScheme> = ParseDidScheme(Type.Indy, indyDidString)
  expect(indyDid.methodName).toBe('indy')
  expect(indyDid.indyNamespace).toBe('sovrin:staging:') // Indy DID spec requires the last character of the namespace to be ':'
  expect(indyDid.methodSpecificId).toBe('6cgbu8ZPoWTnR5Rv5JcSMB')
})

test('Mispelled method name in malformed Indy DID throws error', () => {
  const malformedIndyDidString = 'did:iny:sovrin:6cgbu8ZPoWTnR5Rv5JcSMB'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<IndyDidScheme> = ParseDidScheme(Type.Indy, malformedIndyDidString)
  }).toThrow(MalformedIndyDidSchemeError)
})

test('No namespace in malformed Indy DID throws error', () => {
  const malformedIndyDidString = 'did:indy:6cgbu8ZPoWTnR5Rv5JcSMB'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<IndyDidScheme> = ParseDidScheme(Type.Indy, malformedIndyDidString)
  }).toThrow(MalformedIndyDidSchemeError)
})

test('Non-Base-58 "0" char in malformed Indy DID with throws error', () => {
  const charToTest = '0'
  const indyDidStringWithIllegalBase58Char = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<IndyDidScheme> = ParseDidScheme(Type.Indy, indyDidStringWithIllegalBase58Char)
  }).toThrow(MalformedIndyDidSchemeError)
})

test('Non-Base-58 "O" char in malformed Indy DID with throws error', () => {
  const charToTest = 'O'
  const indyDidStringWithIllegalBase58Char = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<IndyDidScheme> = ParseDidScheme(Type.Indy, indyDidStringWithIllegalBase58Char)
  }).toThrow(MalformedIndyDidSchemeError)
})

test('Non-Base-58 "I" char in malformed Indy DID with throws error', () => {
  const charToTest = 'I'
  const indyDidStringWithIllegalBase58Char = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<IndyDidScheme> = ParseDidScheme(Type.Indy, indyDidStringWithIllegalBase58Char)
  }).toThrow(MalformedIndyDidSchemeError)
})

test('Non-Base-58 "l" char in malformed Indy DID with throws error', () => {
  const charToTest = 'l'
  const indyDidStringWithIllegalBase58Char = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSM' + charToTest
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indyDid: Partial<IndyDidScheme> = ParseDidScheme(Type.Indy, indyDidStringWithIllegalBase58Char)
  }).toThrow(MalformedIndyDidSchemeError)
})