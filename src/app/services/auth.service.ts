import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';
import { JwtService } from './jwt.service';
import { Credential } from '../shared/models/credential';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: MainApiService,
    private jwtService: JwtService
  ) {}

  attemptLogin(credentials: Credential) {
    this.destroyAuth();
    return this.apiService.get('/user/login', credentials);
  }

  registerUser(user) {
    return this.apiService.post('/user/', user);
  }

  registerEmployee(user) {
    return this.apiService.post('/user/', user);
  }

  getUserById(userId) {
    return this.apiService.get('/user/user', { userId });
  }

  getUsersByRole() {
    return this.apiService.get('/user/');
  }

  editUser(userId, user) {
    return this.apiService.put('/user/' + userId, user);
    //return this.apiService.put('/user/user/{ userId }', user, { userId });
  }

  deleteUser(userId) {
    // return this.apiService.delete('/user/', { userId });
    return this.apiService.delete('/user/' + userId);
  }

  // Store Authorization Information
  setAuth(token: string) {
    // Save JWT sent from server in localStorage
    this.jwtService.saveToken(token);
  }

  destroyAuth() {
    // Remove JWT from localStorage
    this.jwtService.destroyToken();
  }
}
