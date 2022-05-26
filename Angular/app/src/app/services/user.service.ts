import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }

  url = "http://localhost:4000/users"
  requestHeader = new HttpHeaders({
    "No-Auth": "True"
  })

  public login(loginData:any){
    return this.http.post(this.url+'/authenticate', loginData, {headers: this.requestHeader});
  }
  public register(registerData:any){
    return this.http.post(this.url+'/register', registerData, {headers: this.requestHeader});
  }

  public roleMatch(AllowedRole: any): boolean{
    let isMatch = false;
    const userRoles:any = this.userAuthService.getRoles();
    
    console.log(`Allo = ${AllowedRole}, user = ${userRoles}`)
    if(userRoles != null && userRoles){
      for(let i=0;i<userRoles.length;i++){
        for(let j=0;j<AllowedRole.length; j++){
          console.log(`Inside rolematch, userRole = ${userRoles[i]}, allow = ${AllowedRole[j]}`)
          if(userRoles[i]===AllowedRole[j][i]){
            isMatch = true;
          }
        }
      }
    }
    return isMatch;
  }
}
