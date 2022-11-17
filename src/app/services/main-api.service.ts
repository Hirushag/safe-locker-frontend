import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtService } from './jwt.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainApiService {
  accessToken: string;
  constructor(private httpClient: HttpClient, private jwtService: JwtService) {
    this.accessToken = sessionStorage.getItem('accessToken')
  }

  /**
   * Setting Headers for API Request
   */
  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.accessToken
    };

    return new HttpHeaders(headersConfig);
  }

  private setHeadersforAuthenticate(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: ''
    };

    return new HttpHeaders(headersConfig);
  }

  /**
   * format errors
   */
  formatErrors(error) {
    return throwError(error.error);
  }

  get(path, params?): Observable<any> {
    return this.httpClient
      .get(`${environment.api_url}${path}`, {
        headers: this.setHeaders(),
        params
      })
      .pipe(
        map(res => res),
        catchError(this.formatErrors)
      );
  }

  authenticate(path, body, params?): Observable<any> {
    return this.httpClient
      .post(`${environment.authenticate_url}${path}`, body, {
        headers: this.setHeadersforAuthenticate(),
        params
      })
      .pipe(
        map(res => res),
        catchError(this.formatErrors)
      );
  }


  post(path, body, params?): Observable<any> {
    return this.httpClient
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
        params
      })
      .pipe(
        map(res => res),
        catchError(this.formatErrors)
      );
  }

  put(path, body, params?): Observable<any> {
    return this.httpClient
      .put(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
        params
      })
      .pipe(
        map(res => res),
        catchError(this.formatErrors)
      );
  }

  delete(path, params?): Observable<any> {
    return this.httpClient
      .delete(`${environment.api_url}${path}`, {
        headers: this.setHeaders(),
        params
      })
      .pipe(
        map(res => res),
        catchError(this.formatErrors)
      );
  }
}
