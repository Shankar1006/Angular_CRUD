import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string) {
    let currentYear: any = new Date().getFullYear();
    let personsBirthYear: any = new Date(value).getFullYear();
    let personsAge = currentYear - personsBirthYear;

        return personsAge;
    }
}
