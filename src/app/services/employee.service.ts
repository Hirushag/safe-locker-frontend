import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apiService: MainApiService) { }

  getAllEmployees() {
    return this.apiService.get('/employee/');
  }

 registerEmployee(employee){

  return this.apiService.post('/employee/',employee);

 }
 deleteEmployee(employeeId){

  return this.apiService.delete('/employee/'+employeeId);

 }
 editEmployee(employeeId,employee){

  return this.apiService.put('/employee/'+employeeId,employee);
 }
 getEmployeeById(employeeId){

  return this.apiService.get('/employee/employee',{employeeId});

 }

}
