import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentRequest } from '../../Interfaces/payment-request';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  baseUrl:string = "https://localhost:7253/Payment"
  constructor(private http:HttpClient) { }

  public CreatePayment(payment:PaymentRequest) : Observable<HttpStatusCode>{
    return this.http.post<HttpStatusCode>(this.baseUrl, payment).pipe(resp => resp, error => error);
  }
  
}
