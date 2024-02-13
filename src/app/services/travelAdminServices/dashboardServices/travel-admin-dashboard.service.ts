import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelAdminDashboardService {

  private apiURL = 'http://localhost:5190/api'
  constructor(private http : HttpClient) { }
  //to generate report based on input month
  generateMonthlyModeReport(month: string): Observable<any> {
    return this.http.get<any>(this.apiURL+`/traveladmin/generatemontlhlymodecountreport?monthName=${month}`,{ responseType: 'blob' as 'json' });
  }

  //to get all project codes and id
  getAllProjects(): Observable<any>{
    return this.http.get<any>(this.apiURL+`/project/projectcodes`)
  }

  // to generate report based on project id
  generateProjectModeReport(projectId: number): Observable<any>{
    return this.http.get<any>(this.apiURL + `/traveladmin/generateprojectmodecount?projectId=${projectId}`,{responseType: 'blob' as 'json'});
  }

  // to get all requests on a monthly basis
  getAllRequestsMonthly():Observable<any>{
    return this.http.get(this.apiURL+`/traveladmin/requestsbymonth`)
  }
}
