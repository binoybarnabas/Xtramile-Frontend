import { Component } from '@angular/core';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent {

  travelTasks = [
    {
      id: 1,
      deadline: {
        date: "25 Mar 24",
        time: "10.00 AM"
      },
      taskInfo: "Book flight tickets to Paris"

    },
    {
      id: 2,
      deadline: {
        date: "10 Apr 24",
        time: "2.00 PM"
      },
      taskInfo: "Research and book accommodations in Rome"

    },
    {
      id: 3,
      deadline: {
        date: "5 May 24",
        time: "9.30 AM"
      },
      taskInfo: "Plan itinerary for trip to Tokyo"

    },
    {
      id: 4,
      deadline: {
        date: "15 May 24",
        time: "11.00 AM"
      },
      taskInfo: "Pack essentials for hiking trip in the Alps"

    },
    {
      id: 4,
      deadline: {
        date: "15 May 24",
        time: "11.00 AM"
      },
      taskInfo: "Pack essentials for hiking trip in the Alps"

    },
  ];

  isTaskSelected: string;
  selectedTaskId!: number;

  constructor() {
    this.isTaskSelected = 'no';
  }

  onTaskSelected(taskId: number) {
    this.isTaskSelected = 'yes';
    this.selectedTaskId = taskId;
  }

  toggleTaskSelection(toggleValue: string) {
    this.isTaskSelected = toggleValue;
    this.selectedTaskId = 0;
  }

}
