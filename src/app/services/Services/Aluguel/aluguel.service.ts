import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AluguelResponse } from '../../Interfaces/aluguel-response';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {

  baseUrl:string = "https://localhost:7253/BookingRoom/"
  constructor(private http:HttpClient) { }
  public listDates(id:number): Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + id).pipe(resp => resp , error => error)
  }
}
