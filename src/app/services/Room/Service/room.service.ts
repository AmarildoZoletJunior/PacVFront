import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomRequest } from '../Interface/room-request';
import { Observable } from 'rxjs';
import { RoomResponse } from '../Interface/room-response';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseUrl:string = "https://localhost:7254/Room"
  constructor(private http:HttpClient) { }

  public CreateRoom(room:RoomRequest) : Observable<HttpStatusCode>{
    return this.http.post<HttpStatusCode>(this.baseUrl, room).pipe(resp => resp, error => error);
  }

  public GetRoomById(id:number) : Observable<RoomResponse>{
    return this.http.get<RoomResponse>(this.baseUrl+"/"+id).pipe(resp => resp, error => error);
  }

  public GetDeleteById(id:number): Observable<HttpStatusCode>{
    return this.http.delete<HttpStatusCode>(this.baseUrl+"/"+id).pipe(resp => resp, error => error);
  }
}
