import * as Did from '../../../../domain/did/did'
import * as ParseDid from '../parseDid'

test('Can parse well-formed generic DID', () => {
  const genericDidString = 'did:abc:12345'
  const genericDid: Did.GenericDid = ParseDid.DidParserFactory(Did.Type.Generic)(genericDidString)
  expect(genericDid.methodName).toBe('abc')
  expect(genericDid.methodSpecificId).toBe('12345')
})

test('Can parse well-formed Indy Did with no subspace', () => {
  const indyDidString = 'did:indy:sovrin:6cgbu8ZPoWTnR5Rv5JcSMB'
  // Set 'Partial' since the compiler can't guarantee all fields required
  // in IndyDid are being returned by the DidParser returned by the factory.
  // In this case, we do check that all fields are coming back below.
  const indyDid: Partial<Did.IndyDid> = ParseDid.DidParserFactory(Did.Type.Indy)(indyDidString)
  expect(indyDid.methodName).toBe('indy')
  expect(indyDid.indyNamespace).toBe('sovrin:') // Indy DID spec requires the last character of the namespace to be ':'
  expect(indyDid.methodSpecificId).toBe('6cgbu8ZPoWTnR5Rv5JcSMB')
})

test('Can parse well-formed Indy Did with subspace', () => {
  const indyDidString = 'did:indy:sovrin:staging:6cgbu8ZPoWTnR5Rv5JcSMB'
  const indyDid: Partial<Did.IndyDid> = ParseDid.DidParserFactory(Did.Type.Indy)(indyDidString)
  expect(indyDid.methodName).toBe('indy')
  expect(indyDid.indyNamespace).toBe('sovrin:staging:') // Indy DID spec requires the last character of the namespace to be ':'
  expect(indyDid.methodSpecificId).toBe('6cgbu8ZPoWTnR5Rv5JcSMB')
})

test('Malformed generic DID throws error', () => {
  const malformedGenericDidString = 'dd:abc:12345'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const genericDid: Did.GenericDid = ParseDid.DidParserFactory(Did.Type.Generic)(malformedGenericDidString)
  }).toThrow(Did.MalformedDidError)
})
