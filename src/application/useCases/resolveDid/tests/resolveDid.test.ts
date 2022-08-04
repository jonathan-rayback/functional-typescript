import DidDocument from '../../../../domain/didDocuments/didDocument'
import ResolveDid from '../resolveDid'
// Mocks for async calls
import DidResolver from '../mocks/didResolver'

test('Can resolve a DID', async () => {
  // expect.assertions(1) // Don't really understand this, just saw it in some sample code, do I need it?
  const expectedDidDocument: DidDocument = {
    id: 'abcdef',
    key: '12345'
  }
  return expect(
    await ResolveDid(DidResolver).then((actualDocument) =>
      didDocsAreEqual(expectedDidDocument, actualDocument)
    )
  )
})

// My own, homebrewed deep-comparison function for did docs.
// Keeps me from needing a big library like lodash for my little test project here.
// The code comes from samples I found online.
// See:
// https://stackoverflow.com/questions/71338191/i-want-to-compare-two-json-objects-excluding-one-of-the-keys-from-it
// &
// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
const didDocsAreEqual = (doc1: DidDocument, doc2: DidDocument): boolean => {
  return Object.keys(doc1).every(
    (key) => doc1[key as keyof DidDocument] === doc2[key as keyof DidDocument]
  )
}
