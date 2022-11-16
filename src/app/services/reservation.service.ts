import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private apiService: MainApiService) {}

  getAllReservations() {
    return this.apiService.get('/reservation/');
  }

  deleteReservation(reservationId) {
    return this.apiService.delete('/reservation/' + reservationId);
  }

  createReservation(request) {
    return this.apiService.post('/reservation/', request);
  }
}
