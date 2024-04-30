import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { AvailableOptions } from 'src/app/services/interfaces/iavailable-options';
import { TravelAdminTravelRequestsService } from 'src/app/services/travelAdminServices/travelRequestsServices/travel-admin-travel-requests.service';

@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.css']
})
export class OptionCardComponent {
  @Input() options: any[] = [];

  selectedOption: any | null = null;
  currentIndex = 0;
  private timer: any;

  constructor() {
    
  }

  ngOnInit(){
    console.log(this.options)
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    console.log('hi')
    this.timer = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.options.length;
      this.selectedOption = this.options[this.currentIndex];
      console.log(this.selectedOption)
    }, 5000); // Change card every 5 seconds
  }

  stopTimer() {
    clearInterval(this.timer);
  }
  
  public formatDateTime(dateTimeString: string): string {
    // Parse the input string to create a Date object
    const dateTime = new Date(dateTimeString);

    // Specify the options for formatting, including the name of the month
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'long', // 'long' will include the full name of the month
      day: 'numeric',
    };

    // Use the toLocaleString method with options to format the date and time
    return dateTime.toLocaleString(undefined, options);
  }
}
