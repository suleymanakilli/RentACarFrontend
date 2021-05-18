import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OneListResponseModel } from '../models/one-list-response-model';
import { ResponseModel } from '../models/response-model';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44367/api/users/"
  constructor(private httpClient:HttpClient) { }
  getUserByMail(email:string):Observable<OneListResponseModel<User>>{
    let newApi=this.apiUrl+"getbymail/?email="+email
    return this.httpClient.get<OneListResponseModel<User>>(newApi)
  }
  update(user:User):Observable<ResponseModel>{
    let newApi=this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newApi,user)
  }
  
    
  
}
