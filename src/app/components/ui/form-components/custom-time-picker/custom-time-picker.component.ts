import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-time-picker',
  templateUrl: './custom-time-picker.component.html',
  styleUrls: ['./custom-time-picker.component.css']
})
export class CustomTimePickerComponent {

  selectedHour: string;
  selectedMinute: string;
  selectedUnitOfTime: string;

  constructor() {
    this.selectedHour = '12';
    this.selectedMinute = '00';
    this.selectedUnitOfTime = 'AM';
  }

  //method to change unit of time
  changeUnitOfTime(newUnit: string) {
    this.selectedUnitOfTime = newUnit;
  }

  //function to update hour
  updateHour(operation: string) {

    //inc
    if (operation === '+') {

      if (this.selectedHour === '12') {

        this.selectedHour = '01';

      }
      else {

        if (this.selectedHour === '11') {

          if (this.selectedUnitOfTime === 'AM') {

            this.changeUnitOfTime('PM');

          }
          else {

            this.changeUnitOfTime('AM');

          }
        }

        this.selectedHour = String(Number(this.selectedHour) + 1);

        if (Number(this.selectedHour) < 10) {

          this.selectedHour = '0' + this.selectedHour;

        }
      }
    }
    //dec
    else {

      if (this.selectedHour === '01') {

        this.selectedHour = '12';


      }
      else {

        this.selectedHour = String(Number(this.selectedHour) - 1);
        if (this.selectedHour === '11') {

          if (this.selectedUnitOfTime === 'AM') {

            this.changeUnitOfTime('PM');

          }
          else {

            this.changeUnitOfTime('AM');

          }
        }


        if (Number(this.selectedHour) < 10) {

          this.selectedHour = '0' + this.selectedHour;

        }
      }

    }

  }

  //function to update minute
  updateMinute(operation: string) {

    //inc
    if (operation === '+') {

      if (this.selectedMinute === '59') {

        this.selectedMinute = '00';
        this.updateHour('+');

      }
      else {

        this.selectedMinute = String(Number(this.selectedMinute) + 1);

        if (Number(this.selectedMinute) < 10) {

          this.selectedMinute = '0' + this.selectedMinute;

        }

      }

    }

    //dec
    else {

      if (this.selectedMinute === '00') {

        this.selectedMinute = '59';
        this.updateHour('-');

      }
      else {

        this.selectedMinute = String(Number(this.selectedMinute) - 1);

        if (Number(this.selectedMinute) < 10) {

          this.selectedMinute = '0' + this.selectedMinute;

        }

      }

    }

  }




}
