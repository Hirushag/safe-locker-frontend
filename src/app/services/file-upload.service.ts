import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {JwtService} from './jwt.service';
import {catchError, tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  baseApiUrl = 'http://localhost:9091/api/v1/file-upload/user/gagana';

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      // Accept: 'multipart/form-data',
      // tslint:disable-next-line:max-line-length
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYWdhbmEiLCJyb2xlIjoiQURNSU4iLCJpc3MiOiIvYXV0aGVudGljYXRlIiwiZXhwIjoxNjY4NzIwNjU2LCJ0eXBlIjoiYWNjZXNzVG9rZW4ifQ.SXMitKrDLXZXX8HpZSbJsiZiHRlfJRwoQjQrYzzKqcE',
    };
    // set auth token header
    // if (this.jwtService.getToken()) {
    //   headersConfig.Authorization = `Bearer ${this.jwtService.getToken()}`;
    //   // tslint:disable-next-line:max-line-length
    //   headersConfig.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYWdhbmEiLCJyb2xlIjoiQURNSU4iLCJpc3MiOiIvYXV0aGVudGljYXRlIiwiZXhwIjoxNjY4NzIwNjU2LCJ0eXBlIjoiYWNjZXNzVG9rZW4ifQ.SXMitKrDLXZXX8HpZSbJsiZiHRlfJRwoQjQrYzzKqcE`;
    // }
    return new HttpHeaders(headersConfig);
  }

  upload(file): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    console.log(formData);
    return this.http.post(this.baseApiUrl, formData, {
      headers: this.setHeaders(),
    });
  }

  httpGetUploadedFiles() {
    const url = this.baseApiUrl
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
    headers = headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYWdhbmEiLCJyb2xlIjoiQURNSU4iLCJpc3MiOiIvYXV0aGVudGljYXRlIiwiZXhwIjoxNjY4NzIwNjU2LCJ0eXBlIjoiYWNjZXNzVG9rZW4ifQ.SXMitKrDLXZXX8HpZSbJsiZiHRlfJRwoQjQrYzzKqcE');
    httpOptions.headers = headers;
  }

}
