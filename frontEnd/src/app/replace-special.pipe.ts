import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceSpecial'
})
export class ReplaceSpecialPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace('ð', 'd').replace('ó','o').replace('ö','o').replace('ú','u').replace('Þ','p');
  }

}
