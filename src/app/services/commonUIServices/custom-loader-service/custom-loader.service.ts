import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomLoaderService {

  constructor() { }

  private loadingSubject = new BehaviorSubject<boolean>(false);

  isLoading = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  // hide() {
  //   this.loadingSubject.next(false);
  // }

  hide() {
    setTimeout(() => {
      this.loadingSubject.next(false);
    }, 500);
  }
  
}
