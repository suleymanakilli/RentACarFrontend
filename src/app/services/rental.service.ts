import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { OneListResponseModel } from '../models/one-list-response-model';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44367/api/rentals/"
  constructor(private httpClient:HttpClient) { }
  getAllRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }
  getRentalsById(carId:number):Observable<OneListResponseModel<Rental>>{
    let newPath=this.apiUrl+"getbyid/?carId="+carId
    return this.httpClient.get<OneListResponseModel<Rental>>(newPath)
  }
  checkIfDateIsAvailable(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"checkifavailable"
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
  add(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
}
