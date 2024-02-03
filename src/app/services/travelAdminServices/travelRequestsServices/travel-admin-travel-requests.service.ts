import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelAdminTravelRequestsService {

  private apiURL = 'http://localhost:5190/api'
  constructor(private http : HttpClient) { }
  getIncomingRequests():Observable<any>{
    return this.http.get(this.apiURL + '/traveladmin/incomingrequests');
  }
}
