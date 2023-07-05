import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authResponse } from '../../Interfaces/authResponse';
import { authRequest } from '../../Interfaces/authRequest';
import { Observable, catchError, map, of } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
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
  public VerifyToken(token: string): Observable<boolean> {
    return this.http
      .get<boolean>(
        `https://localhost:7253/Validate/Admin?token=${token}`,
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
  ): | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> {
    return this.VerifyToken(this.cookieService.get('keyToken') || 'teste').pipe(
      map((x) => {
        if (!x) {
          this.estaLogado = false;
          this.router.navigate(['/homepage']);
          return false;
        }
        this.estaLogado = true;
        if (!this.estaLogado) {
          window.confirm("Infelizmente ocorreu um erro de validação do seu usuário e você está sendo redirecionado para a página de login.");
          this.router.navigate(['/homepage']);
          return false;
        }
        return true;
      }),
      catchError((error) => {
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
