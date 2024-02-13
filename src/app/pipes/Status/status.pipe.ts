import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {
    // Check if the value is "forwarded", then return "Approve", otherwise return the original value
    return value === 'Forwarded' ? 'Approved' : value;
  }

}
