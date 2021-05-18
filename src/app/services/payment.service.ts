import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/credit-card';
import { OneListResponseModel } from '../models/one-list-response-model';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl="https://localhost:44367/api/creditcards/"
  constructor(private httpClient:HttpClient) { }
  getByCustomerId(customerId:number):Observable<OneListResponseModel<CreditCard>>{
    let newApi=this.apiUrl+"getbycustomerid/?customerId="+customerId
    return this.httpClient.get<OneListResponseModel<CreditCard>>(newApi);
  }
  pay(creditCard:CreditCard):Observable<ResponseModel>{
    let newApi=this.apiUrl+"pay"
    return this.httpClient.post<ResponseModel>(newApi,creditCard);
  }
  add(creditCard:CreditCard):Observable<ResponseModel>{
    let newApi=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newApi,creditCard);
  }
  checkIfValid(creditCard:CreditCard):Observable<ResponseModel>{
    let newApi=this.apiUrl+"checkifvalid"
    return this.httpClient.post<ResponseModel>(newApi,creditCard)
  }
}
