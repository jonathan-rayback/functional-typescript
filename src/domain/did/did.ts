export class Did {
  public method: string
  public identifier: string

  constructor (rawDid: string) {
    this.method = this.extractMethod(rawDid)
    this.identifier = this.extractIdentifier(rawDid)
  }

  private readonly extractMethod = (rawDid: string): string => rawDid.split(':')[1] // the second element in a well-formed DID is the method
  private readonly extractIdentifier = (rawDid: string): string => rawDid.split(':')[2] // the third element in a well-formed DID is the identifier
}
