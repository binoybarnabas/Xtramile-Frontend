import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerTravelRequestsService {
  managerId:number = 4;

  constructor(private http: HttpClient) { 
  }

  getEmployeeRequest(managerId: number): Observable<any>{
    const url='http://localhost:5190/api/reportingmanager/request';
    const params = new HttpParams().set('managerId', managerId);
   return this.http.get<any>(url,{params});
   }
   
   getEmployeeRequestByDate(managerId: number, date: string): Observable<any> {
     const url='http://localhost:5190/api/reportingmanager/date';
     var dateString= date.toString();
     const params = new HttpParams().set('managerId', managerId)
     .set('date', encodeURIComponent(date) );  
     console.log(encodeURI(date))
     return this.http.get<any>(url,{params});
    }
   
    getEmployeeRequestSortByEmployeeName(managerId: number) : Observable<any> {
      const url="http://localhost:5190/api/reportingmanager/sort/employeename";
      const params= new HttpParams().set('managerId',managerId)
      return this.http.get<any>(url,{params})
    }
   
   getEmployeeRequestSortByDate(managerId: number) : Observable<any> {
     const url="http://localhost:5190/api/reportingmanager/sort/date";
     const params= new HttpParams().set('managerId',managerId)
     return this.http.get<any>(url,{params})
   }
   
   getEmployeeRequestByEmployeeName(employeeName : string,managerId:number) : Observable<any> {
     const url="http://localhost:5190/api/reportingmanager/search/employeename";
     const params= new HttpParams().set('managerId',managerId).set('employeename',employeeName);
     return this.http.get<any>(url,{params})
   }
   
   getManagerOngoingTravelRequest(managerId: number): Observable<any> {
    return this.http.get(`http://localhost:5190/api/reportingmanager/ongoing/travel/request/${managerId}`);
  }

  GetTravelRequest(requestId:number):Observable<any>{
    return this.http.get(`http://localhost:5190/api/reportingmanager/travel/request/${requestId}`);
  }

  setRequestPriorityAndApprove(requestId:number,priorityId:number):Observable<any>{
    const body = {
      requestId: requestId,
      priorityId: priorityId,
      managerId:this.managerId
    };
    console.log("manager id" + body.managerId);
    return this.http.patch('http://localhost:5190/api/reportingmanager/travel/request/approve',body);
  }

  cancelRequest(requestId:number):Observable<any>{
    const body = {
      requestId: requestId,
      managerId:this.managerId
    };
    return this.http.patch('http://localhost:5190/api/reportingmanager/travel/request/cancel',body);
  }

  getManagerForwardedRequest(managerId: number, offset: number, pageSize: number):Observable<any>{
    const url="http://localhost:5190/api/reportingmanager/travel/request/forwarded"
    const params = new HttpParams()
    .set('managerId',managerId)
    .set('offset',offset)
    .set('pageSize',pageSize)
    return this.http.get(url,{params})
   }
  
   getManagerClosedRequest(managerId: number, offset: number, pageSize: number):Observable<any>{
     const url="http://localhost:5190/api/reportingmanager/travel/request/closed"
     const params = new HttpParams()
     .set('managerId',managerId)
     .set('offset',offset)
     .set('pageSize',pageSize)
     return this.http.get(url,{params})
    }

  //Api service to post reason for cancellation and patch the corresponding reasonId to TBL_REQUEST
  private apiUrl= 'http://localhost:5190/api'
  postReasonToCancel(requestId:number,empId:number,description:string):Observable<any>{
    const body ={
      reasonCode:"",
      description:description,
      createdBy :empId,
      createdOn: new Date()
    }
    console.log(body)
    return this.http.post(this.apiUrl+`/reportingmanager/travel/request/deny?reqId=${requestId}`, body);
  }


}
