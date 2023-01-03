import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  // Inyeccion de los servicios.
  constructor( private fb: FormBuilder, private employeService: EmployeeService){}

  ngOnInit(): void {
    this.employeService.Read().subscribe(
      res => console.log(res)
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
