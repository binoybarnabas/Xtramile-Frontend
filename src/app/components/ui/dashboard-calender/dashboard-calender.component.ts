// import { formatDate } from '@angular/common';
// import { Component, Input } from '@angular/core';
// import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

// @Component({
//   selector: 'app-dashboard-calender',
//   templateUrl: './dashboard-calender.component.html',
//   styleUrls: ['./dashboard-calender.component.css']
// })
// export class DashboardCalenderComponent {

//   constructor(private commonService: CommonAPIService) { }
//   @Input()
//   empId: any;

//   currentRequest: any;

//   currentDate: Date = new Date();
//   deptDate: Date[] = [];
//   returnDate: Date = new Date();

//   ngOnInit() {
//     this.getCurrentTravelRequest();
//   }

//   getCurrentTravelRequest() {
//     this.commonService.getCurrentRequestDates(this.empId).subscribe({
//       next: (data) => {
//         this.currentRequest = data;
//         this.currentRequest = data;
//         for (let i = 0; i < this.currentRequest.length; i++) {
//           this.deptDate[i] = new Date(this.currentRequest[i].departureDate.split(/[-T]/));
//         }

//         console.log(data)
//       }
//     })
//   }

//   getWeeks(): Date[][] {
//     const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
//     const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
//     const weeks: Date[][] = [[]];
//     let currentWeek = 0;

//     for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
//       if (day.getDay() === 0 && weeks[currentWeek].length > 0) {
//         weeks.push([]);
//         currentWeek++;
//       }
//       weeks[currentWeek].push(new Date(day));
//     }

//     // Add padding days from the previous month
//     const firstDayOfWeek = weeks[0][0].getDay();
//     if (firstDayOfWeek > 0) {
//       const previousMonthLastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
//       for (let i = 0; i <= firstDayOfWeek - 1; i++) {
//         weeks[0].unshift(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, previousMonthLastDay - i));
//       }
//     }

//     // Add padding days from the next month
//     const lastDayOfWeek = weeks[weeks.length - 1][weeks[weeks.length - 1].length - 1].getDay();
//     if (lastDayOfWeek < 6) {
//       const nextMonthFirstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
//       for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
//         weeks[weeks.length - 1].push(new Date(nextMonthFirstDay.getFullYear(), nextMonthFirstDay.getMonth(), i));
//       }
//     }

//     return weeks;
//   }

//   nextMonth(): void {
//     this.currentDate.setMonth(this.currentDate.getMonth() + 1);
//   }

//   previousMonth(): void {
//     this.currentDate.setMonth(this.currentDate.getMonth() - 1);
//   }

//   getCurrentMonth(): string {
//     return formatDate(this.currentDate, 'MMMM', 'en-US');
//   }

//   getCurrentYear(): string {
//     return formatDate(this.currentDate, 'yyyy', 'en-US');
//   }


//   isDepartureDate(date: Date): boolean {
//     for (let i = 0; i <= this.deptDate.length; i++) {
//       if (date.getTime() === this.deptDate[i].getTime()) {
//         return true
//       }
//     }
//     return false
//   }

//   isReturnDate(date: Date): boolean {
//     return date.getTime() === this.returnDate.getTime();
//   }

// }


import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';

@Component({
  selector: 'app-dashboard-calender',
  templateUrl: './dashboard-calender.component.html',
  styleUrls: ['./dashboard-calender.component.css']
})
export class DashboardCalenderComponent implements OnInit {

  constructor(private commonService: CommonAPIService) { }
  @Input()
  empId: any;

  currentRequest: any;

  currentDate: Date = new Date();
  deptDates: Date[] = []; // Changed variable name to deptDates
  returnDate: Date = new Date();

  ngOnInit() {
    this.getCurrentTravelRequest();
  }

  getCurrentTravelRequest() {
    this.commonService.getCurrentRequestDates(this.empId).subscribe({
      next: (data) => {
        this.currentRequest = data;
        // Changed the loop to initialize deptDates array
        this.deptDates = this.currentRequest.map((req: any) => new Date(req.departureDate));
        console.log(data)
      }
    })
  }

  getWeeks(): Date[][] {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const weeks: Date[][] = [[]];
    let currentWeek = 0;

    for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
      if (day.getDay() === 0 && weeks[currentWeek].length > 0) {
        weeks.push([]);
        currentWeek++;
      }
      weeks[currentWeek].push(new Date(day));
    }

    // Add padding days from the previous month
    const firstDayOfWeek = weeks[0][0].getDay();
    if (firstDayOfWeek > 0) {
      const previousMonthLastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
      for (let i = 0; i <= firstDayOfWeek - 1; i++) {
        weeks[0].unshift(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, previousMonthLastDay - i));
      }
    }

    // Add padding days from the next month
    const lastDayOfWeek = weeks[weeks.length - 1][weeks[weeks.length - 1].length - 1].getDay();
    if (lastDayOfWeek < 6) {
      const nextMonthFirstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
      for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
        weeks[weeks.length - 1].push(new Date(nextMonthFirstDay.getFullYear(), nextMonthFirstDay.getMonth(), i));
      }
    }

    return weeks;
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
  }

  getCurrentMonth(): string {
    return formatDate(this.currentDate, 'MMMM', 'en-US');
  }

  getCurrentYear(): string {
    return formatDate(this.currentDate, 'yyyy', 'en-US');
  }

  isDepartureDate(date: Date): boolean {
    // Check if the date is in the deptDates array
    return this.deptDates.some(deptDate => this.isSameDay(deptDate, date));
  }

  isReturnDate(date: Date): boolean {
    return date.getTime() === this.returnDate.getTime();
  }

  // Function to check if two dates are the same day
  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

}