import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AluguelResponse } from '../../Interfaces/aluguel-response';
import { AluguelQuartoResponse } from '../../Interfaces/AluguelQuarto-response';
import { AluguelQuartoRequest } from '../../Interfaces/AluguelQuartoRequest';

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
    return this.http.get<string[]>(this.baseUrl + id).pipe(resp => resp , error => error)
  }
  public postBooking(room:AluguelQuartoRequest) : Observable<AluguelQuartoResponse>
  {
    console.log(room)
    return this.http.post<AluguelQuartoResponse>(this.baseUrl,room,this.httpOptions).pipe(resp => resp, error => error)
  }
}
