import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, of, tap } from 'rxjs';

import { EmployeeResponse } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http: HttpClient ) { }

  // Endpoint de la api REST
  private Api_Url = 'http://localhost:4000/rest'


  Create(name: string, position: string, office: string, salary: number){

    const Url = `${this.Api_Url}/create`
    const Body = { name, position, office, salary }

    return this.http.post<EmployeeResponse[]>(Url, Body).pipe(
      tap(res => res),
      catchError(err => of(err.error.msg))
    )
  }
  

  Read(){
    const Url = `${this.Api_Url}/employees`
    return this.http.get<EmployeeResponse>(Url)
  }
  

  Update(){}


  Delete(){}
}
