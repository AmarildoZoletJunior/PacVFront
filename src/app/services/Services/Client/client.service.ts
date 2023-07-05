import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientResponse } from 'src/app/services/Interfaces/client-response';
import { ClientPassword } from 'src/app/services/Interfaces/client-Password';
import { ClientRequest } from '../../Interfaces/client-request';
import { ClienteRequestInfo } from '../../Interfaces/client-request-Info';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl:string = "https://localhost:7253/Client"
  constructor(private http:HttpClient,private cookieService:CookieService) { }

  public CreateClient(client:ClientRequest) : Observable<HttpStatusCode>{
    return this.http.post<HttpStatusCode>(this.baseUrl, client,{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
  }

  public GetClientById(id:number): Observable<ClientResponse>{
    return this.http.get<ClientResponse>(this.baseUrl+"/"+id,{ headers: this.getHeaders() }).pipe(resp => resp,error => error);
  }
public ModifyPassword(cliente:ClientPassword): Observable<HttpStatusCode>{
  return this.http.put<HttpStatusCode>(this.baseUrl + "/Password/",JSON.stringify(cliente),{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
}
public ModifyInfo(cliente:ClienteRequestInfo):Observable<HttpStatusCode>{
  return this.http.put<HttpStatusCode>(this.baseUrl,JSON.stringify(cliente),{ headers: this.getHeaders() }).pipe(resp => resp,error => error)
}
private getHeaders(): HttpHeaders {
  const token = this.cookieService.get("keyToken");

  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  });
}
}
