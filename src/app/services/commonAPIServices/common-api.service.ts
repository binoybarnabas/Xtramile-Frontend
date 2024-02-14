import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RequestStatus } from 'src/app/components/ui/change-status-button/request-status';
import { LoginService } from '../loginService/login.service';
// import { UserData } from '../interfaces/iuserData';
import { UserData } from 'src/app/services/interfaces/iuserData';

@Injectable({
  providedIn: 'root'
})
export class CommonAPIService {

  // initial data - reason why I kept it here and not in the login service is because once the login is done we don't need to initialze that class for other
  // functionality.
  userData?: UserData

  currentLoggedInUserRole: string;

  constructor(private http: HttpClient) {

    //Getting the current Loggedin user based on session value
    this.currentLoggedInUserRole = 'employee';


  }


  apiURL = 'http://localhost:5190/api/'


  getData(): Observable<any> {
    return this.http.get('http://localhost:5190/api/Country')
  }


  postData(data: { key: string }): Observable<any> {
    return this.http.post('http://localhost:5190/api/country/add', data);
  }

  getStatusIdByCode(statusCode: string): Observable<number> {
    return this.http.get<number>(this.apiURL + `status/staustId/${statusCode}`)
  }

  updateRequestStatus(requestStatus: RequestStatus): Observable<RequestStatus> {
    return this.http.post<RequestStatus>(this.apiURL + 'requeststatus/add', requestStatus)
  }


  searchCities(value: string) {
    if (!value || value.length < 3) {
      return [];
    }
    const apiUrl = `http://api.geonames.org/searchJSON?name_startsWith=${value}&maxRows=5&username=demo`;
    return this.http.get(apiUrl).pipe(
      map((data: any) => data.geonames)
    );
  }
  
  //Get Project Codes by emp id
  getAllProjectCodesByEmployeeId(empId: number): Observable<any> {

    return this.http.get<any>(this.apiURL + `project/getprojectcodes/${empId}`)

  }

  getAllTravelModes(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'travelmode/modes')
  }

  getCurrentRequestDates(empId: number): Observable<any>{
    const url="http://localhost:5190/api/employee/current/request"
    const params= new HttpParams().set('empId',empId);
    return this.http.get(url,{params})
  }

  //Get Travel Req By Id
  GetTravelRequestById(requestId: number): Observable<any> {
    return this.http.get(`http://localhost:5190/api/request/getbyid/${requestId}`);
  }


}

