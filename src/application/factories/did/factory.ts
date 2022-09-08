import { Did } from '../../../domain/core/did'

export type DidFactory = (didString: string) => Did | undefined
