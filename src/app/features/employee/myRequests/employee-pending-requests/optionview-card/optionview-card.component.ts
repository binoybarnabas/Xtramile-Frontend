import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';
import { OptionCard } from './optionview-card';
import { AvailableOptions } from 'src/app/services/interfaces/iavailable-options';

@Component({
  selector: 'app-optionview-card',
  templateUrl: './optionview-card.component.html',
  styleUrls: ['./optionview-card.component.css']
})
export class OptionviewCardComponent {

  name: string = 'Submit';
  requestId: number = 0;
  primaryStatusCode: string = 'SD';
  secondaryStatusCode: string = 'SD'

  optionsFromEmployee: AvailableOptions[] = [];
  selectedOption: any | null = null;
  employeeId: number = 1;
  reqId : number = 0
  constructor(private apiservice: RequestService, private activatedRoute : ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((query) => {
      if(query.get('requestId')){
        this.reqId = parseInt(query.get('requestId')!,10)
        this.requestId = this.reqId
      }
    })
    this.apiservice.getDataFromAvailOptions(this.reqId).subscribe((data: any[]) => {
      this.optionsFromEmployee = data;
    });
  }

  //To handle the selected option from the child component
  handleOptionSelected(selectedOption: any): void {
    this.selectedOption = selectedOption;
    console.log(this.selectedOption)
  }
  
  //To handle the selected option and perform the POST request
  postSelection(): void {
    if (this.selectedOption) {
      const { optionId, requestId} = this.selectedOption;
      this.apiservice.postSelection(requestId,this.employeeId, optionId).subscribe({
        next: (response: any) => {
          console.log('Post successful:', response);
          // Reset the selectedOption after a successful post
          this.selectedOption = null;
        },
        error: (error: any) => {
          console.error('Post failed:', error);
        },
        complete: () => {
          console.log('Post request completed.');
        }
      });
    }
  }
}