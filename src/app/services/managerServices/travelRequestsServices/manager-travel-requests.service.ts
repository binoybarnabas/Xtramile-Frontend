import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ManagerTravelRequestsService {

<<<<<<< HEAD
  constructor(private http: HttpClient) {
   }
   
   getEmployeeRequest(managerId: number): Observable<any>{
=======
  constructor(private http: HttpClient) { }

  getEmployeeRequest(managerId: number): Observable<any>{
>>>>>>> e8cb97c0660fcc3d8f523f9cf129b65b8a654520

    const url='http://localhost:5190/api/reportingmanager/request';
    const params = new HttpParams().set('managerId', managerId);
   
   return this.http.get<any>(url,{params});
   }
   
   
   getEmployeeRequestByDate(managerId: number, date: string): Observable<any> {
   
     const url='http://localhost:5190/api/reportingmanager/date';
     var dateString= date.toString();
     const params = new HttpParams().set('managerId', managerId)
     .set('date', encodeURIComponent(date) );  
     console.log(encodeURI(date))
     return this.http.get<any>(url,{params});
<<<<<<< HEAD
=======
     // return this.http.get('http://localhost:5190/api/EmployeeRequest/RequestByDate?managerId=4&date=2024-01-23T06%3A14%3A38.0');
>>>>>>> e8cb97c0660fcc3d8f523f9cf129b65b8a654520
    }
   
    getEmployeeRequestSortByRequestCode(managerId: number) : Observable<any> {
      const url="http://localhost:5190/api/reportingmanager/sort/requestcode";
      const params= new HttpParams().set('managerId',managerId)
      return this.http.get<any>(url,{params})
    }
   
    getEmployeeRequestSortByEmail(managerId: number) : Observable<any> {
     const url="http://localhost:5190/api/reportingmanager/sort/email";
     const params= new HttpParams().set('managerId',managerId)
     return this.http.get<any>(url,{params})
   }
   
   getEmployeeRequestSortByDate(managerId: number) : Observable<any> {
     const url="http://localhost:5190/api/reportingmanager/sort/date";
     const params= new HttpParams().set('managerId',managerId)
     return this.http.get<any>(url,{params})
   }
   
   getEmployeeRequestByEmail(managerId: number, email: string) : Observable<any> {
     const url="http://localhost:5190/api/reportingmanager/email";
     const params= new HttpParams().set('managerId',managerId)
     .set('email', email);
     return this.http.get<any>(url,{params})
   }
   
}
