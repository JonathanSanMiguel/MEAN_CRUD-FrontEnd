import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

// import { EmployeeResponse } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http: HttpClient ) { }


  private Api_Url = 'http://localhost:4000/rest'

  Read(){
    const Url = `${this.Api_Url}/employees`

    // return this.http.get<EmployeeResponse>()

  }

}
