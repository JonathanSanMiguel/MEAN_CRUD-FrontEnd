import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeResponse } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  items: EmployeeResponse[] = []

  // Inyeccion de los servicios.
  constructor( private fb: FormBuilder, private employeService: EmployeeService){}

  // El get de todos los empleados esta +
  // en el ngOnInit para iniciarlo con la UI
  ngOnInit(): void {
    this.employeService.Read().subscribe(
      (res) => {
        this.items = res
      },
      (err) => {console.log(err)}
    )
  }

  // Validacion de los datos del form.
  formularioCRUD: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    position: ['', [Validators.required, Validators.maxLength(12)]],
    office: ['', [Validators.required, Validators.maxLength(10)]],
    salary: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]]
  })

  // Metodo para enviarle los valores al servicio.
  Post(){
    const { name, position, office, salary } = this.formularioCRUD.value

    this.employeService.Create( name, position, office, salary )
  }


  //El observable sirve para quedarse escuchando posibles cambios


}
