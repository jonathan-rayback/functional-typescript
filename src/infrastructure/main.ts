import { MethodType } from '../domain/did/did'
import { CreateDidParser } from '../application/useCases/parseDid/parseDid'

const coreDidString = 'did:key:123456jysh2'
const indyDidString = 'did:indy:sovrin:staging:5nDyJVP1NrcPAttP3xwMB9'

const parseDefaultDid = CreateDidParser(MethodType.DEFAULT)
const parseIndyDid = CreateDidParser(MethodType.INDY)

console.log(parseDefaultDid(coreDidString))
console.log(parseIndyDid(indyDidString))
