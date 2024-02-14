import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {

  private toastSubject = new Subject<string>();
  toastState = this.toastSubject.asObservable();

  constructor() { }

  showToast(message: string) {
    this.toastSubject.next(message);
  }
}
