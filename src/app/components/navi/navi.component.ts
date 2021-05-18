import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  //user:User=LoginComponent.user
  firstName:string
  lastName:string
  email:string
  id:number
  
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")!==null){
      this.firstName=localStorage.getItem("firstName")
      this.lastName=localStorage.getItem("lastName")
      this.email=localStorage.getItem("email")
      this.id=parseInt(localStorage.getItem("id"))
    }
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }
  

}
