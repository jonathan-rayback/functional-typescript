import { Type } from '../domain/did/did'
import { ParseDidScheme } from './useCases/parseDidScheme/parseDidScheme'

const coreDidString = 'did:key:123456jysh2'
const indyDidString = 'did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9'
console.log(ParseDidScheme(Type.Core, coreDidString))
console.log(ParseDidScheme(Type.Indy, indyDidString))
