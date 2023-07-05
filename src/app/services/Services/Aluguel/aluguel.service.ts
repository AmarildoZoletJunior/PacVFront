import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AluguelQuartoResponse } from '../../Interfaces/AluguelQuarto-response';
import { AluguelQuartoRequest } from '../../Interfaces/AluguelQuartoRequest';
import { AluguelQuartoInformacaoResponse } from '../../Interfaces/AluguelQuartoInformacaoResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get("keyToken"); // Substitua 'seu_token_aqui' pelo seu token Bearer real
  
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  }
  baseUrl:string = "https://localhost:7253/BookingRoom/"
  constructor(private http:HttpClient,private cookieService:CookieService) { }
  public listDates(id:number): Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + "room/" + id).pipe(resp => resp , error => error)
  }
  public postBooking(room:AluguelQuartoRequest) : Observable<AluguelQuartoResponse>
  {
    console.log(room)
    return this.http.post<AluguelQuartoResponse>(this.baseUrl,room,{ headers: this.getHeaders() }).pipe(resp => resp, error => error)
  }
  public getBookingsForClientId(ClientId:number): Observable<Array<AluguelQuartoResponse>>{
    return this.http.get<Array<AluguelQuartoResponse>>(`${this.baseUrl}client/${ClientId}`,{ headers: this.getHeaders() }).pipe(resp => resp, error => error)
  }
  public getBookinForId(bookinId:number):Observable<AluguelQuartoInformacaoResponse>{
    return this.http.get<AluguelQuartoInformacaoResponse>(`${this.baseUrl}room/info/${bookinId}`,{ headers: this.getHeaders() }).pipe(resp => resp, error => error)
  }
}
