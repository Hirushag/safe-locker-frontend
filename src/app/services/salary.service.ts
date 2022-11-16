import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private apiService: MainApiService) { }

  getAllSalaries() {
    return this.apiService.get('/salary/');
  }

  registerSalary(salary){

  return this.apiService.post('/salary/',salary);

  }
  deleteSalary(salaryId){

return this.apiService.delete('/salary/'+salaryId);

  }
  getSalaryById(salaryId){

    return this.apiService.get('/salary/salary',{salaryId});

  }
  editSalary(salaryId,salary){

    return this.apiService.put('/salary/'+salaryId,salary);

  }

}
