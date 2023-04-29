import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError, tap, throwError } from 'rxjs';
import { AppError } from '../models/app-error';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = `http://127.0.0.1:8000/api`;

  constructor(private http: HttpClient) { }

  users$ = this.http.get<User[]>(`${this.baseUrl}/users`);

  register(credentials:any){
    return this.http.post(`${this.baseUrl}/register`, credentials)
      .pipe(
        tap((res:any) => {
          console.log(res)
          // sessionStorage.setItem('token', res.token)
        }),
        catchError(this.handleError)
      )
  }

  sendEmailForgotPassword(email: string){
    return this.http.post(`${this.baseUrl}/forgot-password`, {email: email}).pipe(
      catchError(this.handleError)
    )
  }

  toggleStatus(id: number, data: any){
    return this.http.patch<User>(`${this.baseUrl}/users/${id}`, data).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    
    const appError: AppError = {
      status: error.status,
      message: error.error.message
    }
    // if (error.status === 0) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong.
    //   console.error(
    //     `Backend returned code ${error.status}, body was: `, error.error);
    // }
    // Return an observable with a user-facing error message.
    return throwError(() => appError);
  }
}
