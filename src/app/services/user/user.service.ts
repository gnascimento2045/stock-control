import { enviroment } from 'src/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupUserRequest } from 'src/app/models/user/SignupUserRequest';
import { authRequest } from 'src/app/models/user/auth/authRequest';
import { authResponse } from 'src/app/models/user/auth/authResponse';
import { SignupUserResponse } from 'src/app/models/user/signupUserResponse';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = enviroment.API_URL;

  constructor(private http: HttpClient) {}

  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/user`,
      requestDatas
    );
  }

  authUser(requestDatas: authRequest): Observable<authResponse> {
    return this.http.post<authResponse>(`${this.API_URL}/auth`, requestDatas);
  }
}
