import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartItemNumber:any;

  constructor(private userAuthService: UserAuthService,
    public router: Router,
    private cartService: CartService,
    private api:ApiService
    ) { }

  ngOnInit(): void {
    this.api.getCartItems().subscribe((res)=>{
      //this.cartItemNumber = res.length;
      res.forEach((item:any)=>{
        this.cartService.addToCart(res);
      })
      this.cartService.getProducts().subscribe(res=>{
        this.cartItemNumber = res.length;
        console.log(`product in header = ${res}`);
      })
    })
  }

  logout(){
    this.userAuthService.setRoles([]);
    this.userAuthService.setToken('');
    this.router.navigate(['/dashboard']);
    this.cartService.removeAllCart();
  }
  isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }
  showProductPage(): boolean{
    let role = this.userAuthService.getRoles();
    if(role==['Admin']) return true;
    else return false;
  }
}
