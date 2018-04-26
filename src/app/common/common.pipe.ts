import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ObjectKeys'})
export class ObjectKeysPipe implements PipeTransform {

  transform(object = {}): string[] {
    return Object.keys(object);
  }

}
