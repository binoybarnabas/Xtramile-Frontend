import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  isSideBarOpen: any;

  private url = "http://localhost:5190/api/Employee"
  constructor(private http: HttpClient) {

    this.isSideBarOpen = 1;

  }


  getEmployeeData(id: number): Observable<any> {
    // /getEmployee/${id}
    return this.http.get(`${this.url}`);
  }



  postData(data: { key: string }): Observable<any> {
    return this.http.post('http://localhost:5190/api/Country', data);
  }


}
