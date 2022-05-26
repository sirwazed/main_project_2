import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {} from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoaded: boolean = false;
  itemNumber = 1;
  productList:any = [];
  constructor(private apiService: ApiService,
    private cartService: CartService,
    private userAuthService: UserAuthService,
    ) {}
  ngOnInit(): void {
    this.apiService.getProduct(1).subscribe((res)=>{
      this.productList = res;
      this.isLoaded = true;
      this.alignQuantity();
    })
  }

  increment(index:any){
    this.productList[index].quantity+=1;
  }
  decrement(index:any){
    if(this.productList[index].quantity>1){
      this.productList[index].quantity-=1;
    }
  }

  alignQuantity(){
    this.productList.forEach((element: any) => {
      Object.assign(element,{quantity:1,total:element.price})
    });
  }

  addToCart(product: any){
    this.cartService.addToCart(product);
    console.log(`product in dashboard = ${product}`);
    // new code
    // save in db
    let item = {};
    let username = this.userAuthService.getUserName();
    Object.assign(item, {username: username, productShortCode: product.productShortCode, quantity: product.quantity });
    console.log(item);
    this.apiService.addToCart(item).subscribe((res)=>{
      console.log(res);
      item = {};
    },(err)=>{
      console.log(err);
      item = {};
    })
  }
  test(text:any){
    this.productList = [];
    this.isLoaded = false;
    if(text === 'all'){
      this.apiService.getProduct(0).subscribe((res)=>{
        this.productList = res;
        this.isLoaded = true;
        this.alignQuantity();
      })
    }else{
      this.apiService.getByCategory(text).subscribe((res)=>{
        this.productList = res;
        this.isLoaded = true;
        this.alignQuantity();
      })
    }
    
  }

  onPageChange(event:PageEvent){
    this.productList = [];
    this.isLoaded = false;
    this.apiService.getProduct(event.pageIndex+1).subscribe((res)=>{
      this.productList = res;
      this.isLoaded = true;
      this.alignQuantity();
    })
    console.log(event);
  }
  
}
