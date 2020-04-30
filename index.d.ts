
export * from 'axios'
import { AxiosResponse } from 'axios'

export interface StringIndex {
  [key: string]: any;
  [index: number]: any;
}

export type ErrorMap = StringIndex
export type StatusMap = StringIndex
export interface ErrorMapperConfig {
  type?: ErrorMapperTypes;
  templateKey?: string;
  path?: string;
  silentValue?: (string | number) | (string | number)[] | SilentValueFunc;
  map?: ErrorMap;
  defaultMsg?: string;
  handleMsg?: (msg: string, val: string | number) => void;
}

export type ErrorMapperTypes = 'code' | 'status' | 'params'

export type SilentValueFunc = (val: string | number) => boolean

export interface ErrorMapperInstance {
  // getTargetValue: () => string | number;
  // handleErrorResponse: () => void;
  // getErrMsg: () => string;
  // getValueValidation: ()=> boolean
}

export interface ErrorMapperStatic extends ErrorMapperInstance{
  register: (response: AxiosResponse, config: ErrorMapperConfig) => ErrorMapperInstance
}

declare const ErrorMapper: ErrorMapperStatic;

export default ErrorMapper;
