import Did from '../../../../domain/dids/did'
import DidMethodType from '../../../../domain/didMethodTypes'
import DidDocument from '../../../../domain/didDocument'
import MakeResolveDid from '../resolveDid'
import DidResolver from './mocks/mockDidResolver'
import MakeParseDid from '../../parseDid/parseDid'
import ParsedDid from '../../../../domain/parsedDids/parsedDid'

const DID_TYPE: DidMethodType = DidMethodType.DEFAULT
const DID_STRING: string = 'did:key:123456jysh2'
const ParseDid = MakeParseDid(DidMethodType.DEFAULT)
const PARSED_DID: ParsedDid = ParseDid(DID_STRING)
const DID: Did = {
  methodType: DID_TYPE,
  parsedDid: PARSED_DID
}
const ResolveDid = MakeResolveDid(DidResolver)

test('Can resolve a DID', async () => {
  const expectedDidDocument: DidDocument = {
    id: 'abcdef',
    key: '12345'
  }
  return expect(
    await ResolveDid(DID).then((actualDocument) =>
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
