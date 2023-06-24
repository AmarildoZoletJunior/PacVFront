import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { authRequest } from '../../../Interfaces/authRequest';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
  HttpStatusCode,
} from '@angular/common/http';
import { authResponse } from 'src/app/services/Interfaces/authResponse';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  baseUrl: string = 'https://localhost:7253/Auth';
  estaLogado: boolean = false;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  public AuthClient(client: authRequest): Observable<authResponse> {
    return this.http
      .post<authResponse>(this.baseUrl, client, this.httpOptions)
      .pipe(
        (resp) => resp,
        (error) => error
      );
  }
  public VerifyToken(token: string): Observable<string> {
    return this.http
      .get<string>(
        `https://localhost:7253/Validate?token=${token}`,
        this.httpOptions
      )
      .pipe(
        (resp) => resp,
        (error) => error
      );
  }

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let code;
    this.VerifyToken(localStorage.getItem('keyToken') || 'teste').subscribe(
      (x) => {
        if (x != '') {
          if (x == localStorage.getItem('idUser')) {
            this.estaLogado = true;
            console.log("1")
            return
          }
          console.log("2")
          this.estaLogado = false;
          return
        }
        console.log("3")
        this.estaLogado = false;
        return
      },(error)=>{
        console.log("4")
        this.estaLogado = false; 
      }
    );
    if(this.estaLogado == false){
      localStorage.clear()
      window.confirm("Infelizmente, ocorreu um erro de validação do seu usuário e você esta sendo redirecionado para a página de login.")
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
}
