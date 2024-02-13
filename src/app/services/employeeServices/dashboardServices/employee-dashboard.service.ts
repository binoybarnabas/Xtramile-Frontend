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
    return this.http.get('https://mocki.io/v1/3879899b-ae4c-415b-a460-a0f4f0be66c2');
  }
  getUpcomingTripDetails(employeeId: number): Observable<any> {
    return this.http.get(`http://localhost:5190/api/employee/dashboard/upcoming/trip/${employeeId}`);
  }
  getRequestProgress(employeeId: number): Observable<any> {
    return this.http.get(`http://localhost:5190/api/employee/dashboard/employee/progress/${employeeId}`);
  }
}
