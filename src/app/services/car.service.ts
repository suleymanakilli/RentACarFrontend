import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/car-detail';
import { ListResponseModel } from '../models/list-response-model';
import { OneListResponseModel } from '../models/one-list-response-model';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44367/api/cars/"
  constructor(private httpClient:HttpClient) { }
  getCars(brandId:number=0,colorId:number=0):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcarsbyfilter/?brandId="+brandId+"&colorId="+colorId;
    console.log("Path2   :    cars/getcarsbyfilter/"+brandId+"/"+colorId)
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarDetailsById(carId:number):Observable<OneListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"getcardetailsbycarid/?carId="+carId;
    return this.httpClient.get<OneListResponseModel<CarDetail>>(newPath)
  }
  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
  getCarDetailsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"getcardetailsbyfilter/?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
  add(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
}
