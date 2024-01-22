import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
 
  private url = "http://localhost:5190/api/Employee"
  constructor(private http: HttpClient) { }
  getEmployeeData(id:number):Observable<any>{
    // /getEmployee/${id}
    return this.http.get(`${this.url}`);
  }

}
