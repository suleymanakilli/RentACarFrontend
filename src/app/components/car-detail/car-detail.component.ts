
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/car-detail';
import { CarService } from 'src/app/services/car.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carId:number
  carDetails:CarDetail
  constructor(private carService : CarService,private activatedRoute:ActivatedRoute,public filterService:FilterService) { }

  ngOnInit(): void {
    this.filterService.hide()
    this.carId=this.activatedRoute.snapshot.params["carId"]
    this.getCarDetailsById(this.carId)
  }

  getCarDetailsById(carId:number){
    this.carService.getCarDetailsById(carId).subscribe(response=>{
      this.carDetails=response.data
      console.log(this.carDetails.imagePath)
    })
  }
}
