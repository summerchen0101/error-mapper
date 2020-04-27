import { ErrorHandlerConfig } from './type';
import { AxiosResponse } from 'axios'
import { transferStringTemplate, getValueByObjPath } from './utils';

export class ErrorHandler{
  private targetValue: string | number = ""
  private isValidValue = true
  private errMsg = ""
  private constructor(
    private response: AxiosResponse,
    private config: ErrorHandlerConfig
  ) {
    this.handleErrorResponse()
  }

  static register(
    response: AxiosResponse,
    config: ErrorHandlerConfig
  ): ErrorHandler {
    return new ErrorHandler(response, config)
  }

  getTargetValue(): string | number {
    const val = this.config.path && getValueByObjPath(this.config.path, this.response)
    if(Array.isArray(val)) {
      return val?.[0]
    }
    else if(!this.config.path && (typeof this.response === 'number' || typeof this.response === 'string')) {
      return this.response
    }
    return val || ""
  }

  handleErrorResponse(): void {
    this.targetValue = this.getTargetValue()
    this.errMsg = this.getErrMsg()
    this.isValidValue = this.getValueValidation()
    if(!this.isValidValue) {
      this.config.handleMsg?.(this.errMsg, this.targetValue)
    }

  }

  getErrMsg(): string {
    const msg = this.config.map?.[this.targetValue]
      || this.config.defaultMsg
      || `Error occurred!`
    const params = {
      [this.config.templateKey as string]: this.targetValue
    }
    return transferStringTemplate(msg, params)
  }

  getValueValidation(): boolean {
    const silentValue = this.config.silentValue
    if(typeof silentValue === 'string' || typeof silentValue === 'number' ) {
      return silentValue === this.config.silentValue
    }
    else if(Array.isArray(silentValue)) {
      return silentValue.includes(this.targetValue)
    }
    else if(typeof silentValue === 'function') {
      return silentValue(this.targetValue)
    }
    else if(typeof silentValue === 'undefined') {
      return !this.errMsg
    }
    return true
  }

}
