import { Component, Input } from '@angular/core';
import { Notification } from 'src/app/services/interfaces/iNotification';

@Component({
  selector: 'app-dashboard-notification',
  templateUrl: './dashboard-notification.component.html',
  styleUrls: ['./dashboard-notification.component.css']
})
export class DashboardNotificationComponent {

  @Input() notifications: Notification[] = [];

  constructor() { 

  }

  ngOnInit(): void {
    // Initialize the array with notifications
   
  }
}
