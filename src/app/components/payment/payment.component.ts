import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { CarService } from 'src/app/services/car.service';
import { FilterService } from 'src/app/services/filter.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rentAddForm:FormGroup
  paymentForm:FormGroup
  carId:number
  carDetails:CarDetail
  totalPrice:number
  rentDate:Date
  returnDate:Date
  constructor(private formBuilder:FormBuilder, private carService:CarService,private activatedRoute:ActivatedRoute,private toastr:ToastrService,
    private paymentService:PaymentService,private router:Router, private filterService:FilterService,private rentalService:RentalService
    ) { }

  ngOnInit(): void {
    this.filterService.hide()
    this.carId=this.activatedRoute.snapshot.params["carId"];
    this.createPaymentForm()
    this.createRentForm()
    this.getCarDetails(this.carId)
    
    
  }
  getCarDetails(carId:number){
    this.carService.getCarDetailsById(carId).subscribe(response=>{
      this.carDetails=response.data;
      this.totalPrice=this.carDetails.dailyPrice
    })
  }
  createPaymentForm(){
    this.paymentForm=this.formBuilder.group({
      cardNumber:["",Validators.required],
      name:["",Validators.required],
      cvv:["",Validators.required],
      expMonth:["",Validators.required],
      expYear:["",Validators.required],
      customerId:[1]
    })
  }
  createRentForm(){
    this.rentAddForm=this.formBuilder.group({
      carId:[this.carId],
      customerId:[1],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required]
    })

  }

  pay(){
    if(this.rentAddForm.valid&&this.paymentForm.valid){
      let rentModel=Object.assign({},this.rentAddForm.value)  
      let creditCardModel=Object.assign({},this.paymentForm.value)
      this.rentalService.checkIfDateIsAvailable(rentModel).subscribe(response=>{
        this.paymentService.checkIfValid(this.paymentForm.value).subscribe(response=>{
          this.rentalService.add(rentModel).subscribe(response=>{
            this.toastr.success("Success",response.message)
          })
          this.paymentService.pay(creditCardModel).subscribe(response=>{
            this.toastr.success("Success",response.message)
          })
        },responseError=>{
          if(responseError.error.Errors.length>0){
            for (let i = 0; i <responseError.error.Errors.length; i++) {
              this.toastr.error("Error",responseError.error.Errors[i].ErrorMessage)
            }       
          }
        })
      },responseError=>{
        console.log(responseError)
        this.toastr.error(responseError.error.message)
        /*if(responseError.error.Errors.length>0){
          
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastr.error("Error",responseError.error.Errors[i].ErrorMessage)
          }       
        }*/
      })
      
    }
  }
  show(){
    if(this.rentAddForm.valid){
      let returnDateToDate=new Date(this.rentAddForm.value.returnDate);//string olarak döndüğü için date ' e çevirdik
      let rentDateToDate=new Date(this.rentAddForm.value.rentDate)
      let subtractedMilliSeconds=returnDateToDate.getTime()-rentDateToDate.getTime()
      let subtractedDays = Math.floor(subtractedMilliSeconds / (24*60*60*1000));
      this.totalPrice=this.carDetails.dailyPrice*subtractedDays;
    }
  }
  
  

}
