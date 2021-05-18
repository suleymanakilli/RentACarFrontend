
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { CarService } from 'src/app/services/car.service';
import { FilterService } from 'src/app/services/filter.service';
import { RentalService } from 'src/app/services/rental.service';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-rent',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  carDetails:CarDetail
  carId:number
  static returnDate:Date
  static rentDate:Date
 // rental:Rental
  rentalCheckForm:FormGroup

  constructor(private carService : CarService,private activatedRoute:ActivatedRoute,private rentalService:RentalService,
    public filterService:FilterService,private toastr:ToastrService,private formBuilder:FormBuilder,private router:Router) { 
      //this.cDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    }

  ngOnInit(): void {
    this.filterService.hide()
    this.carId=this.activatedRoute.snapshot.params["carId"]
    this.getCarDetailsById(this.carId)
    this.createRentalCheckForm()
  }
  getCarDetailsById(carId:number){
    this.carService.getCarDetailsById(carId).subscribe(response=>{
      this.carDetails=response.data
      console.log(this.carDetails.imagePath)
    })
  }
  
  createRentalCheckForm(){
    this.rentalCheckForm=this.formBuilder.group({
      rentDate:["",Validators.required], //Boşluk default değer
      returnDate:["",Validators.required],
      carId:[this.carId,Validators.required]
    })
    
    
  }
  check(){
    if(this.rentalCheckForm.valid){
      let rentModel=Object.assign({},this.rentalCheckForm.value)
      this.rentalService.checkIfDateIsAvailable(rentModel).subscribe(response=>{
        this.toastr.success("The car is available at that interval time","Success")
      },responseError=>{
        console.log(responseError.error)
        this.toastr.error("Error",responseError.error.message)
        /*if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastr.error("Error",responseError.error.Errors[i].ErrorMessage)
          }       
        }*/
      })
    }else{
      this.toastr.error("Error","Please enter valid values")
    }  
  }
  rent(){
    if(this.rentalCheckForm.valid){
      let rentModel=Object.assign({},this.rentalCheckForm.value)
      this.rentalService.checkIfDateIsAvailable(rentModel).subscribe(response=>{
        this.router.navigate(["/payment/",this.carId])
      },responseError=>{
        console.log(responseError.error)
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastr.error("Error",responseError.error.Errors[i].ErrorMessage)
          }       
        }
      })
    }else{
      this.toastr.error("Error","Please enter valid values")
    }  
  }


}
