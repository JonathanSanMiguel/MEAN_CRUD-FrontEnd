import { Component, Input } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmployeeResponse } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() empleado!: EmployeeResponse

  constructor( private employeService: EmployeeService, private fb: FormBuilder ){}

  // Validacion de los datos del form.
  formularioUpdate: FormGroup = this.fb.group({
    name: [, [Validators.required,  Validators.minLength(4), Validators.maxLength(25)]],
    position: [, [Validators.required, Validators.maxLength(12)]],
    office: [, [Validators.required, Validators.maxLength(10)]],
    salary: [, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]]
  })

  closeModal(){
    this.employeService.modal.emit(false)
  }

  updateEmpleado(){
    console.log(this.empleado)
    console.log(this.empleado.name);
    //console.log(this.formularioUpdate.value);
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
