import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const datePipe: DatePipe = new DatePipe('en-US');
    const formattedDate: string | null = datePipe.transform(value, 'EEEE, d MMMM');
    return formattedDate;
  }
}



@Pipe({
  name: 'customDateFormatWithDay'
})

export class CustomDateFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const datePipe = new DatePipe('en-US');
    const dateObj = new Date(value);

    const formattedDate = datePipe.transform(dateObj, 'dd MMM yy');
    const dayOfWeek = datePipe.transform(dateObj, 'EEEE');

    return `${formattedDate} ${dayOfWeek}`;

  }
}
