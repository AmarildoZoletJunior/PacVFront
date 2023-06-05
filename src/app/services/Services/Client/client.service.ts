import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientResponse } from 'src/app/services/Interfaces/client-response';
import { ClientPassword } from 'src/app/services/Interfaces/client-Password';
import { ClientRequest } from '../../Interfaces/client-request';
import { ClienteRequestInfo } from '../../Interfaces/client-request-Info';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json"',
    })
  };

  baseUrl:string = "https://localhost:7253/Client"
  constructor(private http:HttpClient) { }

  public CreateClient(client:ClientRequest) : Observable<HttpStatusCode>{
    return this.http.post<HttpStatusCode>(this.baseUrl, client).pipe(resp => resp, error => error);
  }

  public GetClientById(id:number): Observable<ClientResponse>{
    return this.http.get<ClientResponse>(this.baseUrl+"/"+id).pipe(resp => resp,error => error);
  }
public ModifyPassword(cliente:ClientPassword): Observable<HttpStatusCode>{
  return this.http.put<HttpStatusCode>(this.baseUrl + "/Password/",JSON.stringify(cliente),this.httpOptions).pipe(resp => resp, error => error);
}
public ModifyInfo(cliente:ClienteRequestInfo):Observable<HttpStatusCode>{
  return this.http.put<HttpStatusCode>(this.baseUrl,JSON.stringify(cliente),this.httpOptions).pipe(resp => resp,error => error)
}
}
