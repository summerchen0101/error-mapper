export interface StringIndex {
  [key: string]: any;
  [index: number]: any;
}

export type ErrorMap = StringIndex
export type StatusMap = StringIndex

export interface ErrorHandlerConfig {
  type?: ErrorHandlerTypes;
  templateKey?: string;
  path?: string;
  silentValue?: (string | number) | (string | number)[] | SilentValueFunc;
  map?: ErrorMap;
  defaultMsg?: string;
  handleMsg?: (msg: string, val: string | number) => void;
}

export type ErrorHandlerTypes = 'code' | 'status' | 'params'

export type SilentValueFunc = (val: string | number) => boolean
