import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authRequest } from '../../Interface/authRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { authResponse } from '../../Interface/authResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-type':'application/json',
    })
  };

  public AuthClient(client:authRequest) : Observable<authResponse>{
    return this.http.post<authResponse>("https://localhost:7254/Auth",client,this.httpOptions).pipe(resp => resp, error => error);
  }

  constructor(private http:HttpClient) { }
}
