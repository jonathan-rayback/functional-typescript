import * as Did from '../../../../domain/did/did'
import { ParseDid } from '../parseDid'

test('Parses well-formed generic DID correctly', () => {
  const myRawDid = 'did:abc:12345'
  const myDid: Did.Did = ParseDid(myRawDid)
  expect(myDid.methodName).toBe('abc')
  expect(myDid.methodSpecificId).toBe('12345')
})

test('Malformed DID throws error', () => {
  const malformedDid = 'dd:abc:12345'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const myDid: Did.Did = ParseDid(malformedDid)
  }).toThrow(Did.MalformedDidError)
})
