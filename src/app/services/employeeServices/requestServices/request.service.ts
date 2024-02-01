import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { travelRequestDetails } from '../../interfaces/iTravelRequestDetails';

@Injectable({
  providedIn: 'root'
})


export class RequestService {

  private apiURL = 'http://localhost:5190/api';

  private apiURL2 = 'http://localhost:5190/api/Employee/info';


  constructor(private http: HttpClient) {
  }


  getEmployeeDataById(id: number): Observable<any> {
    // debugger;
    return this.http.get(`${this.apiURL2}/${id}`);
  }





  //Send Rrequest Data
  sendEmployeeNewTravelRequest(travelRequestData: travelRequestDetails): Observable<any> {
    // Create a FormData object
    const formData = new FormData();

    // Iterate over the properties of travelRequestData and append them to FormData
    Object.entries(travelRequestData).forEach(([key, value]) => {
      // Check if the value is a File (for file attachments)
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });


    //console.log(formData)
    // Make the HTTP request with the correct headers
    const headers = new HttpHeaders();
    // Note: No need to set Content-Type, it will be set automatically by FormData

    return this.http.post(this.apiURL + '/request/add', formData, { headers, responseType: 'text' });
  }





}
