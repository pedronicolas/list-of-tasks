import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent  {
username:string;
password:string;
error:any;
  constructor(private api: ApiService, private router:Router) { }

  login(){
    const {username,password} = this;
    if(username.trim() !== '' && password.trim() !==''){
      this.api.login(username.trim(),password.trim())
      .then((response)=>{
        this.router.navigate(['/board']);
      })
      .catch(console.log)
    }
  }
}
