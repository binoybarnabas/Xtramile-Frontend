import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastObject } from 'src/app/models/utilityModels/ToastObject';

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {

  private toastSubject = new Subject<ToastObject>();
  toastState = this.toastSubject.asObservable();

  constructor() { }

  showToast(toastObj: ToastObject) {
    //const { message, toastType, toastDuration } = toastObj;
    this.toastSubject.next(toastObj);
  }

}
