import { Did } from '../did'

test('Parses well-formed DID correctly', () => {
  const myRawDid = 'did:abc:12345'
  const myDid = new Did(myRawDid)
  const myMethod = myDid.method
  const myIdentifier = myDid.identifier
  expect(myMethod).toBe('abc')
  expect(myIdentifier).toBe('12345')
})

test('Malformed DID throws error', () => {
  const malformedDid = 'dd:abc:12345'
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const myDid = new Did(malformedDid)
  }).toThrow(Error)
})
