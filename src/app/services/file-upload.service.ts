import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {JwtService} from './jwt.service';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  baseApiUrl = 'http://localhost:9091/api/v1/file-upload/user/';
  user: any;
  accessToken: any;

  constructor(private http: HttpClient, private jwtService: JwtService) {
    this.user = JSON.parse(sessionStorage.getItem('user')) ;
    this.accessToken = sessionStorage.getItem('accessToken');
  }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      // Accept: 'multipart/form-data',
      // tslint:disable-next-line:max-line-length
      Authorization: 'Bearer ' + this.accessToken,
    };
    // set auth token header
    // if (this.jwtService.getToken()) {
    //   headersConfig.Authorization = `Bearer ${this.jwtService.getToken()}`;
    //   // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    //   headersConfig.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYWdhbmEiLCJyb2xlIjoiQURNSU4iLCJpc3MiOiIvYXV0aGVudGljYXRlIiwiZXhwIjoxNjY4NzIwNjU2LCJ0eXBlIjoiYWNjZXNzVG9rZW4ifQ.SXMitKrDLXZXX8HpZSbJsiZiHRlfJRwoQjQrYzzKqcE`;
    // }
    return new HttpHeaders(headersConfig);
  }

  upload(file): Observable<any> {

    // this.user = JSON.parse(this.user);

    console.log(this.user);
    const formData = new FormData();
    formData.append('file', file);

    console.log(formData);
    return this.http.post(this.baseApiUrl + this.user.username, formData, {
      headers: this.setHeaders(),
    });
  }

  httpGetUploadedFiles() {
    // this.user = JSON.parse(this.user);
    const url = this.baseApiUrl + this.user.username;
    this.authorization();
    return this.http.get(url, httpOptions)
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(res => {
          return throwError(res.error);
        })
      );
  }

  authorization() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    // tslint:disable-next-line:max-line-length
    headers = headers.append('Authorization', 'Bearer ' + this.accessToken);
    httpOptions.headers = headers;
  }

}
