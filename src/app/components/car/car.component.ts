import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/car-detail';
import { CarService } from 'src/app/services/car.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {
  carDetails:CarDetail[];
  filterText:string
  brandId:number
  colorId:number
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,public filterService: FilterService) { }

  ngOnInit(): void {
    //this.getCarDetails()
    //this.getCars()
    this.filterService.show();
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.brandId=this.activatedRoute.snapshot.params["brandId"]
        this.colorId=this.activatedRoute.snapshot.params["colorId"]
        this.getCarDetailsByFilter(this.brandId,this.colorId);
      }
      else{
        this.getCarDetailsByFilter(0,0);
      }
    })
    
  }
  
  getCarDetailsByFilter(brandId:number,colorId:number){
    this.carService.getCarDetailsByFilter(brandId,colorId).subscribe(response=>{
      this.carDetails=response.data;
      console.log(this.carDetails)
    })
  }

}
