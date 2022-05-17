import { Did } from '../did'

test('DID classes parses well-formed DID correctly', () => {
  const myRawDid = 'did:abc:12345'
  const myDid = new Did(myRawDid)
  const myMethod = myDid.method
  const myIdentifier = myDid.identifier
  expect(myMethod).toBe('abc')
  expect(myIdentifier).toBe('12345')
})
