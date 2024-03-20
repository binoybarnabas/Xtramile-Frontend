import { Component } from '@angular/core';
import { Notification } from 'src/app/services/interfaces/iNotification';

@Component({
  selector: 'app-dashboard-notification',
  templateUrl: './dashboard-notification.component.html',
  styleUrls: ['./dashboard-notification.component.css']
})
export class DashboardNotificationComponent {

  notifications: Notification[] = [];

  constructor() { }

  ngOnInit(): void {
    // Initialize the array with notifications
    this.notifications = [
      new Notification(1, "Your flight booking from New York to London is confirmed.", "25-02-24", "09:30 AM"),
      new Notification(2, "Don't forget your hotel reservation at The Plaza.", "28-02-24", "10:00 AM"),
      new Notification(3, "Your trip itinerary has been updated.", "02-03-24", "03:45 PM"),
      // Add more notifications here
      new Notification(4, "Your car rental booking has been confirmed.", "05-03-24", "02:15 PM"),
      new Notification(5, "Reminder: Check-in online for your upcoming flight.", "10-03-24", "08:00 AM"),
      new Notification(6, "Your airport transfer service is scheduled.", "15-03-24", "11:30 AM"),
      new Notification(7, "Important: Update your passport details for international travel.", "18-03-24", "04:20 PM"),
      new Notification(8, "Your travel insurance policy is expiring soon.", "20-03-24", "09:45 AM"),
      new Notification(9, "Customs regulations for your destination have changed. Review updates.", "22-03-24", "12:00 PM"),
      new Notification(10, "Enjoy complimentary lounge access during your layover.", "25-03-24", "06:30 PM")
    ];
  }
}
