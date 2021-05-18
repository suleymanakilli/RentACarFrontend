import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup

  constructor(private formBuilder:FormBuilder,private carService:CarService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm()
  }
  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:["",Validators.required], //Boşluk default değer
      colorId:["",Validators.required],
      carName:["",Validators.required],
      dailyPrice:["",Validators.required],
      modelYear:["",Validators.required],
      description:["",Validators.required]
    })
  }
  add(){
    if(this.carAddForm.valid){
      let carModel=Object.assign({},this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
        console.log(response)
        this.toastr.success("Success",response.message)
      },responseError=>{
        console.log(responseError.error)
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastr.error("Error",responseError.error.Errors[i].ErrorMessage)
          }       
        }
        
        
      })
      console.log(carModel)
    }else{
      this.toastr.error("Error","Please enter valid values")
    }
    
  }

}
