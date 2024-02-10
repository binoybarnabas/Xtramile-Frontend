import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    return date.toLocaleDateString(); // Adjust format as per requirement
  }


}
