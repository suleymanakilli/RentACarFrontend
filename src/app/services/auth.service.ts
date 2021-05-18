import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login-model';
import { OneListResponseModel } from '../models/one-list-response-model';
import { Register } from '../models/register';
import { ResponseModel } from '../models/response-model';
import { TokenModel } from '../models/token-model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:44367/api/auth/"
  constructor(private httpClient:HttpClient) { }
  login(user:LoginModel):Observable<OneListResponseModel<TokenModel>>{
    let newApi=this.apiUrl+"login"
    return this.httpClient.post<OneListResponseModel<TokenModel>>(newApi,user)
  }
  isAuthenticated(){
    return localStorage.getItem("token")
  }
  add(user:Register):Observable<ResponseModel>{
    let newApi=this.apiUrl+"register"
    return this.httpClient.post<ResponseModel>(newApi,user)
    
  }
  

}
