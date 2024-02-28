import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortYearDateFormat'
})
export class ShortYearDateFormatPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: string | Date): string {
    if (!value) return '';

    // Convert value to Date object if it's not already
    const date = typeof value === 'string' ? new Date(value) : value;

    // Array of month abbreviations
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Get day, month, and year
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Check if it's a leap year and the date is Feb 29
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const isFeb29 = month === 1 && day === 29 && isLeapYear;

    // Format the date
    if (isFeb29) {
      return `29 ${months[month]}' ${String(year).substring(2)}`;
    } else {
      return `${day} ${months[month]}' ${String(year).substring(2)}`;
    }
  }

}
