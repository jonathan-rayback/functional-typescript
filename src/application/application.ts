import { Type } from '../domain/did/did'
import { ParseDid } from './useCases/parseDid/parseDid'

const coreDidString = 'did:key:123456jysh2'
const indyDidString = 'did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9'
console.log(ParseDid(Type.Core, coreDidString))
console.log(ParseDid(Type.Indy, indyDidString))
