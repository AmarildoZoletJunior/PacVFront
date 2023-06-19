import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { authRequest } from '../../../Interfaces/authRequest';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase, HttpStatusCode } from '@angular/common/http';
import { authResponse } from 'src/app/services/Interfaces/authResponse';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  baseUrl:string = 'https://localhost:7253/Auth'
  estaLogado:boolean = false
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-type':'application/json',
    })
  };

  public AuthClient(client:authRequest) : Observable<authResponse>{
    return this.http.post<authResponse>(this.baseUrl,client,this.httpOptions).pipe(resp => resp, error => error);
  }
  public VerifyToken(token:string) : Observable<HttpStatusCode>{
    return this.http.get<HttpStatusCode>(`https://localhost:7253/Validate?token=${token}`,this.httpOptions).pipe(resp => resp,error => error)
  }

  constructor(private http:HttpClient,private router:Router) { }
 
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  let code;
  this.VerifyToken(localStorage.getItem("keyToken") || "teste").subscribe(x =>{
    this.estaLogado = true
    code = 200
    console.log("Caiu aqui Ok 1")
    return true
  },(error)=>{
    localStorage.clear()
    if(error instanceof HttpErrorResponse){
      if(error.status == 401){
        localStorage.clear()
        code = 401
        this.estaLogado = false
        window.confirm("Ocorreu um erro na validação do seu token, estamos te redirecionando para a pagina principal")
        this.router.navigate(['/login']);
        console.log("Caiu aqui Erro 1")
        this.estaLogado = false
        return false
      }
      localStorage.clear()
      this.estaLogado = false
      console.log("Caiu aqui Erro 2")
      return false
    }
    localStorage.clear()
    this.estaLogado = false
    console.log("Caiu aqui Erro 3")
    return false
  })
  console.log("Caiu aqui Ok 2")
  this.estaLogado = true
  return true
}
}
