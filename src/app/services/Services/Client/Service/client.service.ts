import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientRequest } from '../../../Interfaces/client-request';
import { Observable } from 'rxjs';
import { ClientResponse } from 'src/app/services/Interfaces/client-response';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl:string = "https://localhost:7253/Client"
  constructor(private http:HttpClient) { }

  public CreateClient(client:ClientRequest) : Observable<HttpStatusCode>{
    return this.http.post<HttpStatusCode>(this.baseUrl, client).pipe(resp => resp, error => error);
  }

  public GetClientById(id:number): Observable<ClientResponse>{
    return this.http.get<ClientResponse>(this.baseUrl+"/"+id).pipe(resp => resp,error => error);
  }

}
