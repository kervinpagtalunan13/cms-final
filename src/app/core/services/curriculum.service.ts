import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { handleError } from '../errorHandling/errorHandler';
import { Curriculum2 } from '../models/curriculum';


@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private baseUrl = `http://127.0.0.1:8000/api/`;
  constructor(private http: HttpClient) { }
  // {{baseUrl}}curriculums
  curriculums$ = this.http.get<Curriculum2[]>(`${this.baseUrl}curriculums`).pipe(
    catchError(handleError)
  )

  revisions$ = this.http.get<any[]>(`${this.baseUrl}curriculums/revisions`).pipe(
    catchError(handleError)
  )

  electiveSubjects$ = this.http.get<any[]>(`${this.baseUrl}electiveSubjects`).pipe(
    map(electiveSubjs => electiveSubjs.map(electiveSubj => {
      return {
        track: electiveSubj.track, 
        description: [
          electiveSubj.elective_1,
          electiveSubj.elective_2,
          electiveSubj.elective_3,
          electiveSubj.elective_4,
          electiveSubj.elective_5,
        ]
      }
    })),
    catchError(handleError)
  )

  createCurriculum(cur: any){
    return this.http.post<Curriculum2>(`${this.baseUrl}curriculums`, cur).pipe(
      catchError(handleError)
    )
  }
  getCurriculum(id: number){
    return this.http.get<Curriculum2>(`${this.baseUrl}curriculums/${id}`).pipe(
      catchError(handleError)
    )
  }
  updateCurriculum(id:number, data:any){
    return this.http.patch<Curriculum2>(`${this.baseUrl}curriculums/${id}`, data).pipe(
      catchError(handleError)
    )
  }

  // revise
  approveRevision(id:number){
    return this.http.post(`${this.baseUrl}curriculums/approveRevision/${id}`, {}).pipe(
      catchError(handleError)
    )
  }


  updateRevision(data:any){
    return this.http.patch(`${this.baseUrl}curriculums/updateRevision`, data).pipe(
      catchError(handleError)
    )
  }

  getRevisionCurriculum(id: number){
    return this.http.get(`${this.baseUrl}curriculums/revisions/${id}`).pipe(
      catchError(handleError)
    )
  }

  createRevision(data:any){
    return this.http.post(`${this.baseUrl}curriculums/submitRevision`, data).pipe(
      catchError(handleError)
    )
  }

  approveCurriculum(id:number){
    return this.http.post(`${this.baseUrl}curriculums/approve/${id}`, {}).pipe(
      catchError(handleError)
    )
  }
}