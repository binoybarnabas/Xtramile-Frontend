import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/employeeServices/requestServices/request.service';

@Component({
  selector: 'app-optionview-card',
  templateUrl: './optionview-card.component.html',
  styleUrls: ['./optionview-card.component.css']
})
export class OptionviewCardComponent {
  optionsFromEmployee: any[] = [];
  selectedOption: any | null = null;
  employeeId: number = 1;
  reqId : number = 3;
  constructor(private apiservice: RequestService) {}

  ngOnInit() {
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
