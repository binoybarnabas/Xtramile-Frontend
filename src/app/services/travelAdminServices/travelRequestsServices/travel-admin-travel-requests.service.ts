import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WaitingOrSelectedRequests } from '../../interfaces/iwaiting-or-selected-requests';
import { AvailableOptions } from '../../interfaces/iavailable-options';

@Injectable({
  providedIn: 'root'
})
export class TravelAdminTravelRequestsService {

  private apiURL = 'http://localhost:5190/api'
  constructor(private http : HttpClient) { }

  //to get incoming requests for travel admin
   //to get incoming requests for travel admin
   getIncomingRequests(pageIndex: number,pageSize: number):Observable<any>{

    const url= this.apiURL + '/traveladmin/incomingrequests';
    const params= new HttpParams().set('pageIndex',pageIndex)
    .set('pageSize',pageSize);
    return this.http.get(url,{params});
  }
  
  //to get travel request details of a particular request id

  getWaitingOrSelectedRequests(statusCode: string): Observable<WaitingOrSelectedRequests[]>{
    return this.http.get<WaitingOrSelectedRequests[]>(this.apiURL + `/traveladmin/requestsView/${statusCode}`)
  } 
  

  // to post the available options for request from modal
  postAvailOptionData(data: any): Observable<any> {
    console.log(data)
    return this.http.post(this.apiURL +`/availableoptions/add`, data);
  }

  //to get all travel modes for dropdown in the modal
  getTravelModes():Observable<any>{
    return this.http.get(this.apiURL+ '/travelmode/modes')
  }

  //to get all categories for dropdown in modal
  getCategory(): Observable<any>{
    return this.http.get(this.apiURL+ '/category/category')
  }

  getTravelRequest(requestId:number):Observable<any>{
    return this.http.get(this.apiURL+ `/traveladmin/travel/request/${requestId}`);
  }

  getSelectedOption(requestId: number): Observable<AvailableOptions>{
    return this.http.get<AvailableOptions>(this.apiURL+ `/traveladmin/options/selected?reqId=${requestId}`)
  }

  
  //app bar functionalities
  //get all the travel request based on a given date
  getAllRequestByDate(date: string): Observable<any> {
    const url='http://localhost:5190/api/traveladmin/date';
    var dateString= date.toString();
    const params = new HttpParams()
    .set('date', encodeURIComponent(dateString));  
    console.log(encodeURI(date))
    return this.http.get<any>(url,{params});
  }

   //get all the travel request based on a given employee name
   getAllRequestSortByEmployeeName(currentPage:number,pageSize:number) : Observable<any> {
     const url="http://localhost:5190/api/traveladmin/incomingrequest/sort";
     const params= new HttpParams().set('pageIndex',currentPage).set('pageSize',pageSize).set('employeeName',false).set('date',true);
     return this.http.get<any>(url,{params})
   }

   // get all the employee request sorted by date
  getAllRequestSortByDate(currentPage:number,pageSize:number) : Observable<any> {
    const url="http://localhost:5190/api/traveladmin/incomingrequest/sort";
    const params= new HttpParams().set('pageIndex',currentPage).set('pageSize',pageSize).set('employeeName',true).set('date',false);
    return this.http.get<any>(url,{params});
  }
  
  //get the request by searching an employeename
  getAllRequestByEmployeeName(employeeName : string) : Observable<any> {
    const url="http://localhost:5190/api/traveladmin/search/employeename";
    const params= new HttpParams().set('employeename',employeeName);
    return this.http.get<any>(url,{params})
  }

  // get all the requests
  getEmployeeRequest(): Observable<any>{
    const url='http://localhost:5190/api/traveladmin/request';
   return this.http.get<any>(url);
   }

}
