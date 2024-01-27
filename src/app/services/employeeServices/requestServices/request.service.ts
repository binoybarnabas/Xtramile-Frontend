import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
      
}
