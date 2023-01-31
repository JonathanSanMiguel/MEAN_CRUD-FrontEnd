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
  SwitchModal: Boolean = false

  // Inyeccion de los servicios.
  constructor( private fb: FormBuilder, private employeService: EmployeeService ){}

  // El get de todos los empleados esta +
  // en el ngOnInit para iniciarlo con la UI
  ngOnInit(): void {
    this.getEmpleado()
    this.employeService.modal.subscribe((valor) => { this.SwitchModal = valor })
  }

  // Validacion de los datos del form.
  formularioCRUD: FormGroup = this.fb.group({
    name: [, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    position: [, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
    office: [, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    salary: ['', [Validators.required, Validators.min(0)]]
  })

  campoEsValid( campo: string ){
    return this.formularioCRUD.controls[campo].errors && this.formularioCRUD.controls[campo].touched
  }

  openModal(){ this.SwitchModal = true }

  guardar() {
    if (this.formularioCRUD.invalid) {
      this.formularioCRUD.markAllAsTouched()
      return
    } else {
      const { name, position, office, salary } = this.formularioCRUD.value

      this.employeService.Create( name, position, office, salary )
        .subscribe(res => {
          if (res === true) {
            this.getEmpleado()
            this.formularioCRUD.reset()  
            console.log(res.msg)
          } else {
            console.log(res);
          }
        }
      )
    }
  }

  getEmpleado(){
    this.employeService.Read().subscribe(
      (res) => {
        this.items = res.reverse()
      }
    )
  }

  updateEmploye(item: EmployeeResponse){
    this.employeService.empleadoSeleccionado == item
  }

  //El observable sirve para quedarse escuchando posibles cambios
}