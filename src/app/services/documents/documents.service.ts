import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TravelDocuments } from '../interfaces/iTravelDocuments';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  

  constructor(private http:HttpClient) {
  }

  travelDocumentsURL : string = "http://localhost:5190/api/traveldocumentfile";
  
  //get countries info
  getCountries():Observable<any>{
    return this.http.get('https://restcountries.com/v3.1/all')
  }
   
  // send the new document uploaded - docs like passport visa and id from the user profile.
  sendDocumentData(formData:any):Observable<any>{
    return this.http.post<any>(this.travelDocumentsURL + '/add',formData)
  }

  getTravelDocumentByType(fileType : string, pageNumber: number, itemsPerPage: number): Observable<any>{
    const params = new HttpParams()
    .set('pageNumber', pageNumber)
    .set('itemsPerPage', itemsPerPage)
    return this.http.get(this.travelDocumentsURL + `/traveldocuments/${fileType}`,{params});
  }

  getExpiredTravelDocumentByType(fileType : string, pageNumber: number, itemsPerPage: number): Observable<any>{
    const params = new HttpParams()
    .set('pageNumber', pageNumber)
    .set('itemsPerPage', itemsPerPage)
    return this.http.get(this.travelDocumentsURL + `/expiredDocuments/${fileType}`,{params});
  }

  getValidTravelDocumentsByType(fileType : string, pageNumber: number, itemsPerPage: number): Observable<any>{
    const params = new HttpParams()
    .set('pageNumber', pageNumber)
    .set('itemsPerPage', itemsPerPage)
    return this.http.get(this.travelDocumentsURL + `/validDocuments/${fileType}`,{params});
  }

}
