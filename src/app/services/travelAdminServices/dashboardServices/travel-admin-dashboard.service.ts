import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelAdminDashboardService {

  private apiURL = 'http://localhost:5190/api'
  constructor(private http : HttpClient) { }
  generateMonthlyModeReport(month: string): Observable<any> {
    return this.http.get<any>(this.apiURL+`/traveladmin/generatemontlhlymodecountreport?monthName=${month}`,{ responseType: 'blob' as 'json' });
  }

  getAllProjects(): Observable<any>{
    return this.http.get<any>(this.apiURL+`/project/projectcodes`)
  }

  generateProjectModeReport(projectId: number): Observable<any>{
    return this.http.get<any>(this.apiURL + `/traveladmin/generateprojectmodecount?projectId=${projectId}`,{responseType: 'blob' as 'json'});
  }
}
