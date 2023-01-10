import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeResponse } from '../../interfaces/employee.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor( private employeService: EmployeeService, private fb: FormBuilder ){}

  // Validacion de los datos del form.
  formularioUpdate: FormGroup = this.fb.group({
    name: ['',[Validators.required,  Validators.minLength(4), Validators.maxLength(25)]],
    position: ['', [Validators.required, Validators.maxLength(12)]],
    office: ['', [Validators.required, Validators.maxLength(10)]],
    salary: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]]
  })

  closeModal(){
    this.employeService.modal.emit(false)
  }

  get empleado(){
    return this.employeService.empleadoSeleccionado
  }

  updateEmpleado(){
    console.log('Actualizando');
  }

  deleteEmployee(id: string){
    const res = confirm('Estas seguro de borrar este Empleado?')
    if (res === true ) {
      this.employeService.Delete(id)
        .subscribe(res => {
          this.employeService.Read()
          this.closeModal()
          console.log(res);
        }
      )
    }
  }

}
