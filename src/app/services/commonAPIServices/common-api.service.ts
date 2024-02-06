import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestStatus } from 'src/app/components/ui/change-status-button/request-status'; 
import { LoginService } from '../loginService/login.service';

@Injectable({
  providedIn: 'root'
})
export class CommonAPIService {

  userData : any
  
  constructor(private http: HttpClient) { }

 
  apiURL = 'http://localhost:5190/api/'


  getData(): Observable<any> {
    return this.http.get('http://localhost:5190/api/Country')
  }


  postData(data: { key: string }): Observable<any> {
    return this.http.post('http://localhost:5190/api/country/add', data);
  }

  getStatusIdByCode(statusCode : string) : Observable<number>{
    return this.http.get<number>(this.apiURL+`status/staustId/${statusCode}`)
  }

  updateRequestStatus(requestStatus: RequestStatus) : Observable<RequestStatus> {
    return this.http.post<RequestStatus>(this.apiURL+'requeststatus/add', requestStatus)
  }
}

