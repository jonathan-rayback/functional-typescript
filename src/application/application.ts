import { MethodType } from '../domain/did/did'
import { CreateABNFParser } from './lib/parsers/abnfParser/abnfParser'

const coreDidString = 'did:key:123456jysh2'
const indyDidString = 'did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9'

const parseDefaultDid = CreateABNFParser(MethodType.Core)
const parseIndyDid = CreateABNFParser(MethodType.Indy)

console.log(parseDefaultDid(coreDidString))
console.log(parseIndyDid(indyDidString))
