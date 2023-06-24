import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AluguelQuartoResponse } from '../../Interfaces/AluguelQuarto-response';
import { AluguelQuartoRequest } from '../../Interfaces/AluguelQuartoRequest';
import { AluguelQuartoInformacaoResponse } from '../../Interfaces/AluguelQuartoInformacaoResponse';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json"',
    })
  };
  baseUrl:string = "https://localhost:7253/BookingRoom/"
  constructor(private http:HttpClient) { }
  public listDates(id:number): Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + "room/" + id).pipe(resp => resp , error => error)
  }
  public postBooking(room:AluguelQuartoRequest) : Observable<AluguelQuartoResponse>
  {
    console.log(room)
    return this.http.post<AluguelQuartoResponse>(this.baseUrl,room,this.httpOptions).pipe(resp => resp, error => error)
  }
  public getBookingsForClientId(ClientId:number): Observable<Array<AluguelQuartoResponse>>{
    return this.http.get<Array<AluguelQuartoResponse>>(`${this.baseUrl}client/${ClientId}`).pipe(resp => resp, error => error)
  }
  public getBookinForId(bookinId:number):Observable<AluguelQuartoInformacaoResponse>{
    return this.http.get<AluguelQuartoInformacaoResponse>(`${this.baseUrl}room/info/${bookinId}`).pipe(resp => resp, error => error)
  }
}
