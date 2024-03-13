import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDetails } from 'src/app/services/interfaces/iEmployeeProfile'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  //Patch the employee details
  updateProfile(employeeId: number, editedData: { [key: string]: any }): Observable<any> {
    return this.http.patch(`http://localhost:5190/api/employee/edit/profile/details/${employeeId}`, editedData);
  }

  //get the employee details
  getEmployeeData(employeeId: number): Observable<EmployeeDetails> {
    return this.http.get<EmployeeDetails>(`http://localhost:5190/api/employee/profile/details/${employeeId}`)
  }
  //save the details of the uploaded file
  saveFileDetails(fileDetails: any): Observable<any> {
    return this.http.post(``, fileDetails);
  }
}
