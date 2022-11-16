import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private apiService: MainApiService) { }

  getAllUtility() {
    return this.apiService.get('/utility/');
  }
  registerUtility(utility){

    return this.apiService.post('/utility/',utility);

  }
  deleteUtility(utilityId){

    return this.apiService.delete('/utility/'+utilityId);
  }
  getUtilityById(utilityId){

    return this.apiService.get('/utility/utility',{utilityId});
  
  
   }
   editUtility(utilityId,utility){
  
    return this.apiService.put('/utility/'+utilityId,utility);
   }
  
}
