import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerDashboardService {

  private apiURL = 'http://localhost:5190/api'
  constructor(private http : HttpClient) { }
  
  getAllRequestsMonthly(empId:number):Observable<any>{
    return this.http.get(this.apiURL+`/reportingmanager/travel/completedtrips/${empId}`)
  }
}
