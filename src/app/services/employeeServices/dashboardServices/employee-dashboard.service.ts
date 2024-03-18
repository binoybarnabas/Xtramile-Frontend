import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDashboardService {
  apiURL = 'http://localhost:5190/api/'

  constructor(private http: HttpClient) {
  }
  getCountryImage(): Observable<any> {
    return this.http.get('https://mocki.io/v1/81ffc774-35e6-4b6b-ae5d-eb02129eb9e1');
  }
  getUpcomingTripDetails(employeeId: number): Observable<any> {
    return this.http.get(`http://localhost:5190/api/employee/dashboard/upcoming/trip/${employeeId}`);
  }
  getRequestProgress(employeeId: number): Observable<any> {
    return this.http.get(`http://localhost:5190/api/employee/dashboard/employee/progress/${employeeId}`);
  }
  getCompletedTrips(empId:number):Observable<any>{
    return this.http.get(`http://localhost:5190/api/employee/completedtrips/${empId}`)
  }
}
