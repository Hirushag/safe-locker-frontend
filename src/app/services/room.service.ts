import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private apiService: MainApiService) {}

  getAllRooms() {
    return this.apiService.get('/room/');
  }
  registerRoom(room) {
    return this.apiService.post('/room/', room);
  }
  deleteRoom(roomId) {
    return this.apiService.delete('/room/' + roomId);
  }
  editRoom(roomId, room) {
    return this.apiService.put('/room/' + roomId, room);
  }
  getRoomById(roomId) {
    return this.apiService.get('/room/room', { roomId });
  }
  getAvailableRooms(checkin, checkout) {
    return this.apiService.get('/room/check/availability', {
      checkin,
      checkout,
    });
  }
}
