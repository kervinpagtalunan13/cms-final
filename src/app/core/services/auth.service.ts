import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import { AppError } from '../models/app-error';
import { User } from '../models/user';
import { handleError } from '../errorHandling/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `http://localhost:8000/api/`;
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  currentUser$ = this.currentUserSubject.asObservable()
  currentUser!:User | any
  constructor(private http: HttpClient) { }
  
  login(credentials:any){
    return this.http.post(`${this.baseUrl}login`, credentials)
      .pipe(
        tap((response:any) => {
          this.storeToken(response.token)
          this.currentUserSubject.next(response.user)
          this.currentUser = response.user
          console.log(response.user);
          
        }),
        catchError(handleError)
      )
  }

  logout(){
    return this.http.post(`${this.baseUrl}logout`, {})
      .pipe(
        tap(response => {
          this.removeToken()
          this.currentUserSubject.next(null)
          this.currentUser = null
        }),
        catchError(handleError)
      )
  }

  storeToken(token:string){
    localStorage.setItem('token', token)
  }
  removeToken(){
    localStorage.removeItem('token')
  }

  getCurrentUser(){
    if(this.currentUser)
      return of(this.currentUser)
    
    return this.http.post(`${this.baseUrl}getUser`, {})
    .pipe(
      tap((user:any) => {
        this.currentUserSubject.next(user)
        this.currentUser = user
      }),
      catchError(() => {
        // this.removeToken()
        return of(null);
      })
    )
  }

  updateProfile(profile:any){
    const updatedUser = {...this.currentUser, profile: profile}
    this.currentUserSubject.next(updatedUser)
    this.currentUser = updatedUser
  }

}
