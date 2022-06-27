export enum MethodType {
  Core = 'CORE',
  Indy = 'INDY',
}

export interface Did {
  readonly methodType: MethodType
}
