import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import { BehaviorSubject, catchError, combineLatest, map, of, tap} from 'rxjs';
import { handleError } from '../errorHandling/errorHandler';
import { ElectiveTrack } from '../models/elective';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl = `http://127.0.0.1:8000/api`;
  constructor(private http: HttpClient) { }
  subjectAdd$ = new BehaviorSubject<Subject | null>(null);

  subjects$ = this.http.get<Subject[]>(`${this.baseUrl}/subjects`).pipe(
    catchError(handleError)
  )

  addSubject(subject:any){
    return this.http.post<Subject[]>(`${this.baseUrl}/subjects`, subject)
      .pipe(
        tap((data:any) => {
          this.subjectAdd$.next(data)
        }),
        catchError(handleError)
      )
  }

  updateSubject$ = new BehaviorSubject<any>(null)
  updateElective$ = new BehaviorSubject<any>(null)
  updateSubject(data:any, type:string, id:number){
    if(type == 'subject'){
      return this.http.post(`${this.baseUrl}/subjects/update/${id}`, data).pipe(
        tap(data => {
          this.updateSubject$.next(data)
        }),
        catchError(handleError)
      )
    }

    return this.http.post(`${this.baseUrl}/electives/update/${id}`, data).pipe(
      tap(data => {
        this.updateElective$.next(data)
      }),
      catchError(handleError)
    )
  }

  electives$ = this.http.get<any[]>(`${this.baseUrl}/electives`)
    .pipe(
      catchError(handleError)
    )

  editElectiveSubject(data:any[], id:number){
    const body = {
      elective_1: data[0],
      elective_2: data[1],
      elective_3: data[2],
      elective_4: data[3],
      elective_5: data[4],
    }

    return this.http.patch(`${this.baseUrl}/electiveSubjects/${id}`, body)
      .pipe(

        catchError(handleError)
      )
  }

  updateElectiveSubject(data:any, id: number){
    const body = { metadata: data }
    return this.http.patch<any[]>(`${this.baseUrl}/electiveSubjects/${id}`, body).pipe(
      catchError(handleError)
    )
  }

  electiveSubjects$ = this.http.get<any[]>(`${this.baseUrl}/electiveSubjects`).pipe(
    map(electiveSubj => electiveSubj.map(subj => {
      return {...subj, metadata: !!JSON.parse(subj.metadata).length ? JSON.parse(subj.metadata) : [null, null, null, null, null]}})),
    catchError(handleError)
  )
  
  addedElectiveSubject$ = new BehaviorSubject<any>(null)
  addElective(data: any){
    return this.http.post<any>(`${this.baseUrl}/electives`, data).pipe(
      tap(x => {
        this.addedElectiveSubject$.next(x)
      }),
      catchError(handleError)
    )
  } 


  // )
    // })),
    // map(electiveSubjs => electiveSubjs.map(electiveSubj => {
    //   return {
    //     track: electiveSubj.track, 
    //     description: [
    //       electiveSubj.elective_1,
    //       electiveSubj.elective_2,
    //       electiveSubj.elective_3,
    //       electiveSubj.elective_4,
    //       electiveSubj.elective_5,
    //     ]
    //   }
    // })),

  subjectsComplete$ = combineLatest([
    this.subjects$,
    this.subjectAdd$
  ]).pipe(
    map(([subjects, addSubject]) => {
      if(!addSubject)
        return subjects
      return [...subjects, addSubject]
    })
  )
  
  removeSubject(id:number, data:any){
    return this.http.patch<Subject>(`${this.baseUrl}/subjects/${id}`, data)
      .pipe(
        catchError(handleError)
      )
  }
}
