import { EventEmitter, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, of, tap } from 'rxjs';

import { EmployeeResponse } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Inyeccion de los servicios
  constructor( private http: HttpClient ) { }

  modal = new EventEmitter()

  // Endpoint de la api REST
  private Api_Url = 'http://localhost:4000/rest'

  // Metodo para crear un nuevo Empleado
  Create(name: string, position: string, office: string, salary: number){

    const Url = `${this.Api_Url}/create`
    const Body = { name, position, office, salary }

    return this.http.post<EmployeeResponse>(Url, Body).pipe(
      //Si sale bien retorna la resp.state.
      map(resp => resp.state),
      //Si ocurre un error, retorna el mensaje de error.
      catchError(err => of(err.error.msg))
    )
  }
  

  // Metodo para obtener todos los empleados
  Read(): Observable<EmployeeResponse[]>{
    const Url = `${this.Api_Url}/employees`
    return this.http.get<EmployeeResponse[]>(Url)
  }
  

  Update(){}


  Delete(_id: string){
    return this.http.delete(`${this.Api_Url}/delete/${_id}`)
  }
}
