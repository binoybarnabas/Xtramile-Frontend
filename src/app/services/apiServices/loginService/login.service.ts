import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  isLoggedIn = false;

  
  private URL = "http://localhost:5190/api/Auth/login"

  constructor(private httpClient: HttpClient,private router:Router) { }

  postData(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.URL}`,data)
  }

  isAuthenticated(){
    return this.isLoggedIn;
  }

  updatePassword(email: string, password: string): Observable<any>{
    const body = {email: email, password: password}
    return this.httpClient.patch('http://localhost:5190/api/employee/update/password', body)
  }

}
