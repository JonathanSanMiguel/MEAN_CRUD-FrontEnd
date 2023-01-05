import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor( private employeeService: EmployeeService, ){}

  closeModal(){
    this.employeeService.modal.emit(false)
  }

  updateEmpleado(){
    console.log('Actualizando');
  }

  deleteEmployee(id: string){
    const res = confirm('Estas seguro de borrar este Empleado?')
    if (res) {
      this.employeeService.Delete(id)
    } else {
      
    }
  }

}
