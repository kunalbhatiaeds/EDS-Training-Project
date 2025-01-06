import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === undefined) {
      return 'N/A'; // Return 'N/A' if the value is undefined
    }
    return `${value} years old`; // Return the formatted age
  }
}
