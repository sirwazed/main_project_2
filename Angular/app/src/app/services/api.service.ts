import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:4000/';

  constructor( private http: HttpClient,
    public userAuthService: UserAuthService
    ) { }
  getProduct(ofset:any){
    return this.http.get<any>(this.url+'products/get/'+ofset)
    .pipe(map((res)=>{
      return res;
    }))
  }
  getProductByCode(data:any){
    return this.http.get<any>(this.url+'products/'+data);
  }
  getByCategory(cat:any){
    return this.http.get<any>(this.url+'products/category/'+cat)
    .pipe(map((res)=>{
      return res;
    }))
  }
  addProduct(data:any){
    return this.http.post<any>(this.url+'products/create',data);
  }

  editProduct(data:any, id:any){
    return this.http.put<any>(this.url+'products/'+id, data);
  }

  deleteProduct(id:any){
    return this.http.delete(this.url+'products/'+id);
  }
  addToCart(data:any){
    return this.http.post<any>(this.url+'cart/',data);
  }
  getCartItems(){
    return this.http.get<any>(this.url+'cart/'+this.userAuthService.getUserName());
  }
  deleteCartItem(productShortCode:any){
    return this.http.delete<any>(this.url+'cart/'+productShortCode);
  }
  deleteAllCartItems(){
    return this.http.delete<any>(this.url+'cart/all/');
  }
}
