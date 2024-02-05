import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WaitingOrSelectedRequests } from './waiting-or-selected-requests';

@Injectable({
  providedIn: 'root'
})
export class TravelAdminTravelRequestsService {

  private apiURL = 'http://localhost:5190/api'
  constructor(private http : HttpClient) { }

  getIncomingRequests():Observable<any>{
    return this.http.get(this.apiURL + '/traveladmin/incomingrequests');
  }

  getWaitingOrSelectedRequests(statusCode: string): Observable<WaitingOrSelectedRequests[]>{
    return this.http.get<WaitingOrSelectedRequests[]>(this.apiURL + `/traveladmin/requestsView/${statusCode}`)
  } 
  
}
