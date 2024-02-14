import { enviroment } from 'src/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupUserRequest } from 'src/app/models/user/SignupUserRequest';
import { authRequest } from 'src/app/models/user/auth/authRequest';
import { authResponse } from 'src/app/models/user/auth/authResponse';
import { SignupUserResponse } from 'src/app/models/user/signupUserResponse';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = enviroment.API_URL;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    ) {}

  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/user`,
      requestDatas
    );
  }

  authUser(requestDatas: authRequest): Observable<authResponse> {
    return this.http.post<authResponse>(`${this.API_URL}/auth`, requestDatas);
  }

  isLoggeIn():boolean{
    //verificar se usuario possui um token ou cookie de acesso.
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true: false;

  }

}
