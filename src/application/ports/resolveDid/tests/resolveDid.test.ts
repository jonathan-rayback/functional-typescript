import { DidDocument } from '../../../../domain/core'
import { DidResolver } from '../../../../domain/didResolver'
import { IndyDidDocument } from '../../../../domain/didDocuments/IndyDidDocument'
import { makeIndyDid } from '../../../../domain/dids/IndyDid'
import MakeResolveDid from '../resolveDid'

const MOCKED_DID_DOCUMENT = JSON.stringify({
  id: 'abcdef',
  data: '12345'
}) as DidDocument

const mockForTestResolver: DidResolver = {
  resolve: async (): Promise<DidDocument> => {
    const resolved = new Promise<DidDocument>((resolve, reject) => {
      resolve(MOCKED_DID_DOCUMENT)
    })
    return await resolved
  }
}

const did = makeIndyDid('did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9')
const ResolveDid = MakeResolveDid(mockForTestResolver)

if (did !== undefined) {
  test('Can resolve a DID', async () => {
    const expectedDidDocument: DidDocument = `{
      id: 'abcdef',
      data: '12345'
    }` as IndyDidDocument
    return expect(
      await ResolveDid(did).then((actualDocument) =>
        didDocsAreEqual(expectedDidDocument, actualDocument)
      )
    )
  })
}

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
