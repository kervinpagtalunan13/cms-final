import { Injectable } from '@angular/core';
import iziToast from 'izitoast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showToastSuccess(title:string, message: string) {
    iziToast.success({
      title: title,
      message: message,
      position: 'bottomRight',
      timeout: 10000,
    });
  }

  showToastError(title:string, message: string) {
    iziToast.error({
      title: title,
      message: message,
      position: 'bottomRight',
      timeout: 10000,
    });
  }
}