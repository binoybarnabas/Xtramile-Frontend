import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PendingRequest } from 'src/app/features/employee/myRequests/employee-pending-requests/pending-request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiURL = 'http://localhost:5190/api/Employee/info';
  constructor(private http:HttpClient) {
    }

    getEmployeeDataById(id : number): Observable<any>{
      // debugger;
      return this.http.get(`${this.apiURL}/${id}`);
    }
    
    ///Get all available options with reqId
    getDataFromAvailOptions(reqId: number):Observable<any>{
      const apiUrl = `http://localhost:5190/api/employee/viewoptions/request/${reqId}`;
      return this.http.get(apiUrl);
    }
    
    //Post a selected option with optionId, employeeId, requestId
    postSelection(requestId: number, employeeId: number,optionId: number): Observable<any>{
      const body = {requestId:requestId,empId:employeeId, optionId:optionId};
      console.log(body)
      return this.http.post('http://localhost:5190/api/requestmapping/add/option', body);
    }

    getRequestsPendingStatus(empId: number): Observable<PendingRequest[]> {
      return this.http.get<PendingRequest[]>(
        `http://localhost:5190/api/employee/viewpendingrequest/${empId}`
      );
    }

    getStatusName(requestId : number) : Observable<string>{
      return this.http.get(`http://localhost:5190/api/requeststatus/name/${requestId}`, { responseType: 'text' })
    }
}
