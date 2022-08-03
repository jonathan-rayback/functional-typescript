import DidDocument from '../../../../domain/didDocuments/didDocument'
import ResolveDid from '../resolveDid'

test('Can resolve a DID', () => {
  const actualDidDocument = ResolveDid()
  const expectedDidDocument: DidDocument = {
    id: 'abcdef',
    key: '12345'
  }
  expect(didDocsAreEqual(expectedDidDocument, actualDidDocument)).toBe(true)
})

// My own, homebrewed deep-comparison function for did docs.
// Keeps me from needing a big library like lodash for my little test project here.
// The code comes from samples I found online.
const didDocsAreEqual = (doc1: DidDocument, doc2: DidDocument): boolean => {
  return Object.keys(doc1).every(
    (key) => doc1[key as keyof DidDocument] === doc2[key as keyof DidDocument]
  )
}
