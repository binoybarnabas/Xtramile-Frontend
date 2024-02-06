import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn = false;

  private URL = "http://localhost:5190/api/Auth/login"

  constructor(private httpClient: HttpClient) { }

  postData(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.URL}`,data)
  }

  isAuthenticated(){
    return this.isLoggedIn;
  }

}
