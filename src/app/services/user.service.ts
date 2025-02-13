import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {env} from '../environment/environment';
import {User} from '../model/User.type';
import {Router} from '@angular/router';


interface ApiTokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',

})
export class UserService {

  private baseUrl: string = env.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
  }


  async login(user: User) {
    console.log(this.baseUrl + "api/login_check");
    console.log(user)
    return this.http.post<ApiTokenResponse>(this.baseUrl + "api/login_check", {
      username: user.email,
      password: user.password
    }).subscribe(response => {
        let token = response.token
        localStorage.setItem("token", token);
        this.router.navigate(['admin/dashboard']);


      }
    )
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['admin/auth']);
  }
}
