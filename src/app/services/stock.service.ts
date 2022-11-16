import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root'
})
// export class StockService {

//   constructor() { }
// }
export class StockService {

  constructor(private apiService: MainApiService) { }

  getAllStocks() {
    return this.apiService.get('/stock/');
  }
 registerItem(stock){
  return this.apiService.post('/stock/',stock);

 }
 deleteItem(stockId){
 
 return this.apiService.delete('/stock/'+stockId);

 }
 getItemById(stockId){

  return this.apiService.get('/stock/stock',{stockId});


 }
 editItem(stockId,stock){

  return this.apiService.put('/stock/'+stockId,stock);
 }

}
