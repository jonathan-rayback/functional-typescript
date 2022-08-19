import {
  DidDocument,
  validateDidString,
  ValidDidString
} from '../../../../domain/domain'
import MakeResolveDid from '../resolveDid'
import MockDidResolver from './mocks/mockDidResolver'
import IndyParser from '../../../lib/didParsers/parsers/indyParser'

const didString = validateDidString(
  'did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9'
) as ValidDidString
const DidParser = IndyParser
const did = DidParser.parse(didString)

const ResolveDid = MakeResolveDid(MockDidResolver)

test('Can resolve a DID', async () => {
  const expectedDidDocument: DidDocument = {
    id: 'abcdef',
    key: '12345'
  }
  return expect(
    await ResolveDid(did).then((actualDocument) =>
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
