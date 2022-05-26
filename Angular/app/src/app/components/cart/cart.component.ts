import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cartItem:any = [];
  public products:any=[];
  public grandTotal:number = 0;
  constructor(private CartService: CartService,
    private api: ApiService) { }

  ngOnInit(): void {
    this.setupPage();
  }

  setupPage(){
    this.api.getCartItems().subscribe(res=>{
      this.cartItem = res;
      this.getDetails();
    })
  }
  getDetails(){
    this.cartItem.forEach((item:any)=>{
      this.api.getProductByCode(item.productShortCode).subscribe((res)=>{
        let product = res[0];
        console.log(res[0]);
        Object.assign(product,{quantity:item.quantity,total: res[0].price*item.quantity});
        this.grandTotal += product.total;
        this.products.push(product);
      })
    })
    console.log(`products = ${this.products}`);
  }

  removeItem(item:any){
    console.log(item);
    this.api.deleteCartItem(item.productShortCode).subscribe((res)=>{
      if(res){
        alert('Product deleted successfully');
        this.CartService.removeCartItem(item);
        this.cartItem = [];
        this.products = [];
        this.grandTotal = 0;
        this.setupPage();
      }
    }
    )
  }

  emptyCart(){
    this.api.deleteAllCartItems().subscribe((res)=>{
      this.cartItem = [];
      this.products = [];
      this.grandTotal = 0;
      this.CartService.removeAllCart();
    },(err)=>{
      alert(err.message);
    }
    )
    
  }

}
