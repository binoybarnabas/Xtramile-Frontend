import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WaitingOrSelectedRequests } from '../../interfaces/iwaiting-or-selected-requests';
import { AvailableOptions } from '../../interfaces/iavailable-options';
import { TravelOptionDetails } from '../../interfaces/iTravelOptionDetails';

@Injectable({
  providedIn: 'root'
})
export class TravelAdminTravelRequestsService {

  private apiURL = 'http://localhost:5190/api'
  constructor(private http: HttpClient) { }

  //to get incoming requests for travel admin
  //to get incoming requests for travel admin
  getIncomingRequests(pageIndex: number, pageSize: number): Observable<any> {

    const url = this.apiURL + '/traveladmin/incomingrequests';
    const params = new HttpParams().set('pageIndex', pageIndex)
      .set('pageSize', pageSize);
    return this.http.get(url, { params });
  }


  //to get travel request details of a particular request id

  getWaitingOrSelectedRequests(statusCode: string): Observable<WaitingOrSelectedRequests[]> {
    return this.http.get<WaitingOrSelectedRequests[]>(this.apiURL + `/traveladmin/requestsView/${statusCode}`)
  }


  // to post the available options for request from modal
  postAvailOptionData(data: any): Observable<any> {
    console.log(data)
    return this.http.post(this.apiURL + `/availableoptions/add`, data);
  }

  //to get all travel modes for dropdown in the modal
  getTravelModes(): Observable<any> {
    return this.http.get(this.apiURL + '/travelmode/modes')
  }

  //to get all categories for dropdown in modal
  getCategory(): Observable<any> {
    return this.http.get(this.apiURL + '/category/category')
  }

  getTravelRequest(requestId: number): Observable<any> {
    return this.http.get(this.apiURL + `/traveladmin/travel/request/${requestId}`);
  }

  getSelectedOption(requestId: number): Observable<AvailableOptions> {
    return this.http.get<AvailableOptions>(this.apiURL + `/traveladmin/options/selected?reqId=${requestId}`)
  }

  //Send Rrequest Data
  addNewTravelOption(formData: FormData): Observable<any> {



    console.log(formData)
    // Make the HTTP request with the correct headers
    const headers = new HttpHeaders();
    // Note: No need to set Content-Type, it will be set automatically by FormData

    // return this.http.post<any>(this.apiURL + '/availableoptions/addoption', formData, { responseType: 'json' });
    return this.http.post(this.apiURL + '/availableoptions/addoption', formData, { headers, responseType: 'text' });
  }





}
