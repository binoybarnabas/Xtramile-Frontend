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
