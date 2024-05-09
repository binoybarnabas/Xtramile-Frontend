import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptService implements HttpInterceptor{

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const JwtToken = localStorage.getItem('JwtToken');
  if(JwtToken){
    // console.log("jwt token already exists")
    req = req.clone({setHeaders:{
      'Authorization':`Bearer ${JwtToken}`
    }})
  }
  return next.handle(req);
  }
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
  
}
