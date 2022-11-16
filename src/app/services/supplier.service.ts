import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private apiService: MainApiService) { }

  getAllSuppliers() {
    return this.apiService.get('/supplier/');
  }
  registerSupplier(supplier){

   return this.apiService.post('/supplier/',supplier);

  }
  deleteSupplier(supplierId){

    return this.apiService.delete('/supplier/'+supplierId)

  }

  editSupplier(supplierId,supplier){

    return this.apiService.put('/supplier/'+supplierId,supplier)
  }
  getSupplierById(supplierId){

    return this.apiService.get('/supplier/supplier',{supplierId})
  }
}
