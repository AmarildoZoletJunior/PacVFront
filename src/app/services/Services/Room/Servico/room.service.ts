import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomResponse } from '../../../Interfaces/room-response';
import { RoomResponseWithImage } from 'src/app/services/Interfaces/room-with-images';
import { RoomRequest } from 'src/app/services/Interfaces/room-request';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseUrl:string = "https://localhost:7253/Room"
  baseUrlImage:string = "https://localhost:7253/Image"
  constructor(private http:HttpClient,private cookieService:CookieService) { }

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get("keyToken"); // Substitua 'seu_token_aqui' pelo seu token Bearer real
  
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  }

  public CreateRoom(room:RoomRequest) : Observable<RoomResponse>{
    return this.http.post<RoomResponse>(this.baseUrl, room,{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
  }

  public GetRoomsAvailable():Observable<Array<RoomResponseWithImage>>{
    return this.http.get<Array<RoomResponseWithImage>>(this.baseUrl+"/"+"Availables?PageNumber=1&PageSize=15",{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
  }
  public GetRooms():Observable<Array<RoomResponse>>{
    return this.http.get<Array<RoomResponse>>(this.baseUrl+"?PageNumber=1&PageSize=50",{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
  }

  public GetRoomByIdWithImage(id:number): Observable<RoomResponseWithImage>{
    return this.http.get<RoomResponseWithImage>(this.baseUrl+"/Images/" + id,{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
  }
  
  public GetRoomById(id:number) : Observable<RoomResponse>{
    return this.http.get<RoomResponse>(this.baseUrl+"/"+id,{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
  }

  public DeleteById(id:number): Observable<HttpResponse<HttpStatusCode>>{
    return this.http.delete<HttpResponse<HttpStatusCode>>(this.baseUrl+"/"+id,{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
  }

  public CreateImageMainRoom(id:number,data:FormData): Observable<HttpResponse<HttpStatusCode>>{
    return this.http.post<HttpResponse<HttpStatusCode>>(`${this.baseUrlImage}/ImageMain/${id}`,data,{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
  }
  public PostImagensRoom(id:number,data:FormData): Observable<HttpResponse<HttpStatusCode>>{
    return this.http.post<HttpResponse<HttpStatusCode>>(`${this.baseUrlImage}/${id}`,data,{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
  }

  public ActiveOrDesactiveRoom(id:number): Observable<HttpResponse<HttpStatusCode>>{
    return this.http.get<HttpResponse<HttpStatusCode>>(`${this.baseUrl}/Available/${id}`,{ headers: this.getHeaders() }).pipe(resp => resp, error => error);
  }
}
