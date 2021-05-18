import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { FilterService } from 'src/app/services/filter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  user:User
  userUpdateForm:FormGroup
  constructor(private filterService:FilterService,private userService:UserService,private formBuilder:FormBuilder,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.filterService.hide()
    this.getUserByMail(localStorage.getItem("email"))
    
    this.createUserUpdateForm()
  }
  getUserByMail(email:string){
    this.userService.getUserByMail(email).subscribe(response=>{
      this.user=response.data
      console.log(this.user)
    })
  }
  createUserUpdateForm(){
    this.userUpdateForm=this.formBuilder.group({
      firstName:[localStorage.getItem("firstName"),Validators.required], //Boşluk default değer
      lastName:[localStorage.getItem("lastName"),Validators.required],
      email:[localStorage.getItem("email"),Validators.required]
    })
  }
  update(){
    if(this.userUpdateForm.valid){
      let userModel=Object.assign({},this.userUpdateForm.value)
      this.userService.update(userModel).subscribe(response=>{
        console.log(response)
        this.toastr.success("Success",response.message)
        window.location.reload()
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
