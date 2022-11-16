import { Injectable } from '@angular/core';
import {MainApiService} from './main-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: MainApiService) { }

  createUser(user) {
    return this.apiService.post('/user', user);
  }

  getAllUsers() {
    return this.apiService.get('/users');
  }

  deleteUser(userId) {
    return this.apiService.delete('/users/' + userId);
  }
  editUser(userId, user) {
    return this.apiService.put('/user/' + userId, user);
  }

  getUserById(userId) {
    return this.apiService.get('/user/user', { userId });
  }

}
