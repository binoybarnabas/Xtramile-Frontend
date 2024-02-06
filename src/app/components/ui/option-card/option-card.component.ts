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
  @Input() options: AvailableOptions[] = [];
  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  clickable: boolean = true

  selectedOption: any | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    if(this.activatedRoute!.parent!.snapshot.url.some((segment) => segment.path === 'waiting')){
      this.clickable = false
    }
  }

  ngOnChanges(){
    console.log(this.options)
  }

  ngOnDestroy() {}

  //To emit the selected option to parent component//
  selectOption(option: any): void {
    this.selectedOption = this.selectedOption === option ? null : option;
    this.optionSelected.emit(this.selectedOption);
  }
  
  //To Duration of Travel using start time and end time//
  public calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMilliseconds = end.getTime() - start.getTime();

    // Convert duration to hours and minutes
    const hours = Math.floor(durationInMilliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((durationInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));
    
    return `${hours}h ${minutes}m`;
  }

  
  public formatDateTime(dateTimeString: string): string {
    // Parse the input string to create a Date object
    const dateTime = new Date(dateTimeString);
  
    // Specify the options for formatting, including the name of the month
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'long', // 'long' will include the full name of the month
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  
    // Use the toLocaleString method with options to format the date and time
    return dateTime.toLocaleString(undefined, options);
  }
}
