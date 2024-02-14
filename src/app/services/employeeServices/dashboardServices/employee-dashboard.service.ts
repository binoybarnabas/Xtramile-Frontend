import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDashboardService {

  constructor(private http: HttpClient) {
  }
  getCountryImage(): Observable<any> {
    return this.http.get('https://mocki.io/v1/3a5bb29c-8562-40f0-be88-2f5c84e02927');
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
