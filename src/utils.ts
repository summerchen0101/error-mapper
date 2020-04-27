import { StringIndex } from './type'
export function transferStringTemplate(templateString: string, inserts: StringIndex): string {
  return templateString?.replace(/\{\s*([$#@\-\d\w]+)\s*\}/gim, (v, val: string) => {
    return inserts[val]
  })
}

export function getValueByObjPath(objectPath: string, data: StringIndex): any {
  return objectPath?.split('.').reduce((val, next) => {
    return val[next] || ""
  }, data)
}


