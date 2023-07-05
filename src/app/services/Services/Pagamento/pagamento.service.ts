import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentRequest } from '../../Interfaces/payment-request';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  
  baseUrl:string = "https://localhost:7253/Payment"
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get("keyToken"); // Substitua 'seu_token_aqui' pelo seu token Bearer real
  
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  }
  constructor(private http:HttpClient,private cookieService:CookieService) { }

  public CreatePayment(payment:PaymentRequest) : Observable<HttpStatusCode>{
    return this.http.post<HttpStatusCode>(this.baseUrl, payment,{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
  }
  
}
