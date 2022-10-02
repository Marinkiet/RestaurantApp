import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable ,tap} from 'rxjs';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/Interfaces/IUserLogin';
import { User } from '../shared/models/user';


const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  //EXPOSE USER (observabe) not allow write
  //userObservable as readonly of the user subject
  public userObservable:Observable<User>;
  constructor( private http:HttpClient,private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
   }

   login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          //toast for successful
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Rest-for-Food ${user.name}!`,
            'Login Successful'
          )
        },
        error:(errorResponse)=>{
          this.toastrService.error(
            errorResponse.error,
            'Login Failed'
          )
        }
      })
    )
   }

   logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
   }
   private setUserToLocalStorage(user:User){
      localStorage.setItem(USER_KEY,JSON.stringify(user))
   }
   private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson)return JSON.parse(userJson) as User;
    return new User();
   }
}
