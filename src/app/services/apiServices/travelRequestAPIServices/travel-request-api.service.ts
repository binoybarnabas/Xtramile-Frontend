import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelRequestApiService {

  constructor(private http: HttpClient) { }

  withdrawTravelRequest(withdrawalFormData: any):Observable<any>{
    return this.http.post<any>('http://localhost:5190/api/requests/withdraw-travel-request',withdrawalFormData);
  }  
  
  forwardTravelRequestToTravelAdmin(requestId:number, managerId :number):Observable<any>{
    const body = {
      requestId: requestId,
      managerId:managerId
    };
    return this.http.patch('http://localhost:5190/api/reportingmanager/travel/request/approve',body);
  }


  sendTravelTickets(travelTicketData: any):Observable<any>{
    return this.http.post('http://localhost:5190/api/traveladmin/send-travel-tickets',travelTicketData,{responseType: 'text'});

  }

  rejectTravelRequest(rejectionFormData: any):Observable<any>{
    console.log(rejectionFormData)
    return this.http.post<any>('http://localhost:5190/api/requests/reject-travel-request',rejectionFormData);
  }  


  updateTravelCompletion(travelDetails: any):Observable<any>{

    return this.http.post<any>('http://localhost:5190/api/requests/update-completed-travel',travelDetails);

  }

  
}
