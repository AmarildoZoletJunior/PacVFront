import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomRequest } from '../Interface/room-request';
import { Observable } from 'rxjs';
import { RoomResponse } from '../Interface/room-response';
import { RoomResponseWithImage,Image } from '../Interface/room-with-images';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseUrl:string = "https://localhost:7253/Room"
  constructor(private http:HttpClient) { }

  public CreateRoom(room:RoomRequest) : Observable<HttpStatusCode>{
    return this.http.post<HttpStatusCode>(this.baseUrl, room).pipe(resp => resp, error => error);
  }

  public GetRoomsAvailable():Observable<Array<RoomResponseWithImage>>{
    return this.http.get<Array<RoomResponseWithImage>>(this.baseUrl+"/"+"Availables?PageNumber=1&PageSize=15").pipe(resp => resp, error => error);
  }
  public GetRooms():Observable<Array<RoomResponse>>{
    return this.http.get<Array<RoomResponse>>(this.baseUrl+"?PageNumber=1&PageSize=50").pipe(resp => resp, error => error);
  }

  public GetRoomByIdWithImage(id:number): Observable<RoomResponseWithImage>{
    return this.http.get<RoomResponseWithImage>(this.baseUrl+"/Images/" + id).pipe(resp => resp, error => error);
  }
  
  public GetRoomById(id:number) : Observable<RoomResponse>{
    return this.http.get<RoomResponse>(this.baseUrl+"/"+id).pipe(resp => resp, error => error);
  }

  public DeleteById(id:number): Observable<HttpResponse<HttpStatusCode>>{
    return this.http.delete<HttpResponse<HttpStatusCode>>(this.baseUrl+"/"+id).pipe(resp => resp, error => error);
  }

}
