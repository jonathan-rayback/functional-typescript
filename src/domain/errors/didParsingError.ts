export class DidParsingError extends Error {
  constructor (didString: string, message: string) {
    super(message)
    this.name = 'DidParsingError'
    this.didString = didString
  }

  didString: string
}
