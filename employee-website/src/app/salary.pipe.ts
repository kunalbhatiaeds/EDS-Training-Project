import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salary'
})
export class SalaryPipe implements PipeTransform {
  transform(value: number, currencySymbol: string = '$'): string {
    // Ensuring the "per annum" is appended to the salary string
    if (value != null && !isNaN(value)) {
      return `${currencySymbol}${value.toLocaleString()} per annum`;
    }
    return 'N/A'; // Return 'N/A' if salary is not provided or is invalid
  }
}
