import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  

  constructor(private http:HttpClient) {
  }
  
  //get countries info
  getCountries():Observable<any>{
    return this.http.get('https://restcountries.com/v3.1/all')
  }
   
  // send the new document uploaded - docs like passport visa and id from the user profile.
  sendDocumentData(formData:any):Observable<any>{
    return this.http.post<any>('http://localhost:5190/api/traveldocumentfile/add',formData)
  }

}
