import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ObjectKeys'})
export class ObjectKeysPipe implements PipeTransform {

  transform(object = {}): string[] {
    return Object.keys(object);
  }

}

@Pipe({name: 'ValidCommon'})
export class ValidCommonPipe implements PipeTransform {

  transform(commonList): string[] {
    commonList = commonList || [];
    return commonList.filter(common => !/icons/.test(common.name));
  }

}
