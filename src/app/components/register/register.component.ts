import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FilterService } from 'src/app/services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup
  constructor(private filterService:FilterService,private toastr:ToastrService,private authService:AuthService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.filterService.hide()
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      firstName:["",Validators.required], //Boşluk default değer
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  add(){
    if(this.registerForm.valid){
      let userModel=Object.assign({},this.registerForm.value)
      this.authService.add(userModel).subscribe(response=>{
        console.log(response)
        this.toastr.success("Success",response.message)
        this.router.navigate(["login"])
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
