import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  baseApiUrl = 'localhost:9091/api/v1/file-upload/user/gagana';

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // tslint:disable-next-line:max-line-length
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYWdhbmEiLCJyb2xlIjoiQURNSU4iLCJpc3MiOiIvYXV0aGVudGljYXRlIiwiZXhwIjoxNjY4NzIwNjU2LCJ0eXBlIjoiYWNjZXNzVG9rZW4ifQ.SXMitKrDLXZXX8HpZSbJsiZiHRlfJRwoQjQrYzzKqcE',
    };
    // set auth token header
    if (this.jwtService.getToken()) {
      headersConfig.Authorization = `Bearer ${this.jwtService.getToken()}`;
      // tslint:disable-next-line:max-line-length
      headersConfig.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYWdhbmEiLCJyb2xlIjoiQURNSU4iLCJpc3MiOiIvYXV0aGVudGljYXRlIiwiZXhwIjoxNjY4NzIwNjU2LCJ0eXBlIjoiYWNjZXNzVG9rZW4ifQ.SXMitKrDLXZXX8HpZSbJsiZiHRlfJRwoQjQrYzzKqcE`;
    }
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

  uploadfile(file: File) {
    const formParams = new FormData();
    formParams.append('file', file);
    return this.http.post(this.baseApiUrl, formParams, {
      headers: this.setHeaders(),

    });
  }


  // post(path, body, params?): Observable<any> {
  //   return this.http
  //     .post(`${environment.api_url}${path}`, JSON.stringify(body), {
  //       headers: this.setHeaders(),
  //       params
  //     })
  //     .pipe(
  //       map(res => res),
  //       catchError(this.formatErrors)
  //     );
  // }
}
