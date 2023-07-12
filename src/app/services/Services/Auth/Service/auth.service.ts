import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
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
import { CookieService } from 'ngx-cookie-service';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.VerifyToken(this.cookieService.get('keyToken') || 'teste').pipe(
      map((x) => {
        if (x != '') {
          if (x == this.cookieService.get('idUser')) {
            this.estaLogado = true;
            return true;
          }
          this.estaLogado = false;
          window.confirm("Infelizmente ocorreu um erro de validação do seu usuário e você esta sendo redirecionado para a página de login.")
          this.router.navigate(['/login'])
          return false;
        }
        if(this.estaLogado == false){
        this.cookieService.deleteAll()
        window.confirm("Infelizmente ocorreu um erro de validação do seu usuário e você esta sendo redirecionado para a página de login.")
        this.router.navigate(['/login'])
        return false
      }
      return true
      }),catchError((error) => {
        if (error.status === 401) {
          window.confirm("Infelizmente ocorreu um erro de validação do seu usuário e você está sendo redirecionado para a página de login.");
          this.router.navigate(['/login/administracao']);
          return of(false);
        } 
        else {
          window.confirm("Infelizmente ocorreu um erro de validação do seu usuário e você está sendo redirecionado para a página de login.");
          this.router.navigate(['/login/administracao']);
          return of(false);
        }
      })
    );
  }
}
