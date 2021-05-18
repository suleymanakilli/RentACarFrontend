import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FilterService } from 'src/app/services/filter.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  email:string
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastr:ToastrService,private userService:UserService,
    private router:Router,private filterService:FilterService) { }
  ngOnInit(): void {
    this.filterService.hide()
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel=Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastr.info(response.message)
        localStorage.setItem("token",response.data.token)
        console.log(response)
        this.email=this.loginForm.value.email
        this.userService.getUserByMail(this.email).subscribe(response=>{
          localStorage.setItem("firstName",response.data.firstName)
          localStorage.setItem("id",(response.data.id).toString())
          localStorage.setItem("lastName",response.data.lastName)
          localStorage.setItem("email",response.data.email)
          window.location.reload()
          
          
        })
        this.router.navigate(["cars"])
        
        
        //console.log("user : "+this.user)
        //console.log("email : "+this.email)
        //this.userService.getUserByMail(this.email)
      },responseError=>{
        this.toastr.error(responseError.error)
      })
    }  
    
  }


}
