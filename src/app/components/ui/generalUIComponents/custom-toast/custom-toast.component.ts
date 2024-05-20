import { Component, Input } from '@angular/core';
import { CustomToastService } from 'src/app/services/helperServices/toastServices/custom-toast.service';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.css']
})
export class CustomToastComponent {


  message: string = "Custom Toast";
  visible: boolean = false;

  toastType: string = 'success';
  toastDuration : number = 3000;

  currentToastColor = '#9a4cfa';

  successToastColor : string ='#9a4cfa';
  failToastColor : string = '#ff5053';
  warningToastColor : string = '#FFCC00';

  //ms - for reference
  succssToastDuration : number = 3000;
  failToastDuration : number = 7000;
  warningToastDuration : number = 6000;

  constructor(private toastService: CustomToastService) { }

  ngOnInit(): void {
    this.toastService.toastState.subscribe(toastObj => {
      this.message = toastObj.message;
      this.toastDuration = toastObj.toastDuration;

      this.updateToastColor(toastObj.toastType)

      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, this.toastDuration); // Hide toast after 3 seconds
    });
  }

  updateToastColor(toastType: string){

    if(toastType === 'success'){
      this.currentToastColor = this.successToastColor;
    }else if(toastType === 'fail' || toastType === 'error'){
      this.currentToastColor = this.failToastColor;
    }else{
      this.currentToastColor = this.warningToastColor;
    }

  }

}
