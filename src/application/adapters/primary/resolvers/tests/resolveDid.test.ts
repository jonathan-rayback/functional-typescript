import { DidDocument } from '../../../../../domain/core/didDocument'
import { MockResolver } from '../mockResolver'
import { MockLedger } from '../../../secondary/ledgers/mockLedger'
import { IndyDidDocument } from '../../../../../domain/didDocuments/indyDidDocument'
import { IndyFactory } from '../../../../factories/did/indyFactory'

const did = IndyFactory('did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9')
const resolver = MockResolver(MockLedger)

if (did !== undefined) {
  test('Can resolve a DID', async () => {
    const expectedDidDocument: IndyDidDocument = `{
      id: 'abcdef',
      data: '12345'
    }` as IndyDidDocument
    return expect(
      await resolver
        .resolve(did)
        .then((actualDocument) =>
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
