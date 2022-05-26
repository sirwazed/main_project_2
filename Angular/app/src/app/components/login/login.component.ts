import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private loginBuilder: FormBuilder,
    private registerBuilder: FormBuilder,
    private api:ApiService,
    private cartService:CartService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.loginBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
    });
    this.registerForm = this.registerBuilder.group({
      username: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      password: ['',Validators.required],
    })
  }

  test(){
    console.log(this.registerForm.value);
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('.', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }

  login(){
    this.userService.login(this.loginForm.value).subscribe((response:any)=>{
      console.log(response.token, response.role);
      this.userAuthService.setRoles(response.role);
      this.userAuthService.setToken(response.token);
      this.userAuthService.setUserName(response.username);

      this.api.getCartItems().subscribe((res)=>{
        //this.cartItemNumber = res.length;
        res.forEach((item:any)=>{
          this.cartService.addToCart(res);
        })
      });

      // logic here
      //this.reload('/')
      this.router.navigate(['/']);

    },
    (err)=>{
      console.log(err.error.message);
      alert(err.error.message);
    }
    )
  }

  register(){
    Object.assign(this.registerForm.value,{role: 'User'});
    //console.log(this.registerForm.value);
    this.userService.register(this.registerForm.value).subscribe((response:any)=>{
      console.log(response);
      console.log(response.length);
      if(response.length == 0){
        alert("Account Created. Please login with your id");
      }else{
        alert(response);
      }
      
    
  })
};

}
