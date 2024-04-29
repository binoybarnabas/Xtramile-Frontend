import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})


export class NotificationsComponent {

  @Input()
  requestNotification: any= []

  constructor() {
  }
  ngAfterViewInit(){
    console.log("after view init",this.requestNotification)
  }
}
