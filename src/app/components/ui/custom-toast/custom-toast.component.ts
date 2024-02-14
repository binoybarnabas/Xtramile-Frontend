import { Component, Input } from '@angular/core';
import { CustomToastService } from 'src/app/services/toastServices/custom-toast.service';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.css']
})
export class CustomToastComponent {


  message: string = "";
  visible: boolean = false;

  constructor(private toastService: CustomToastService) { }

  ngOnInit(): void {
    this.toastService.toastState.subscribe(message => {
      this.message = message;
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 3000); // Hide toast after 3 seconds
    });
  }

}
