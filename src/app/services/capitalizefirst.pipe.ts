import { Pipe, PipeTransform } from '@angular/core';
/*
 * Capitalize the first letter of the string
 * Takes a string as a value.
 * Usage:
 *  value | capitalizefirst
 * Example:
 *  // value.name = daniel
 *  {{ value.name | capitalizefirst  }}
 *  fromats to: Daniel
*/
@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: string, args: any[]): string {
    if (value === null) return 'Not assigned';
    let resultString = '';
    for (let i = 0; i < value.length; i++) {
        if (this.alphaValidation(value.charAt(i)) || value.charAt(i) == " ") resultString += (value.charAt(i)).toLowerCase();
    }
    return resultString.charAt(0).toUpperCase() + resultString.slice(1);
  }

  alphaValidation(string){
    const regExp = new RegExp(/^[a-zA-Z]+$/);
    if (regExp.test(string)){
      return true;
    } else {
      return false;
    }
  }
}