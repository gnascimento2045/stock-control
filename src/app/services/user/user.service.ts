import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { SignupUserRequest } from './../../models/user/SignupUserRequest';
import { Observable } from 'rxjs';
import { SignupUserResponse } from 'src/app/models/user/signupUserResponse';
import { authRequest } from 'src/app/models/user/auth/authRequest';
import { authResponse } from 'src/app/models/user/auth/authResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = enviroment.API_URL;

  constructor(private http: HttpClient) { }

//METODO DE CRIAR USUARIO IMPLEMENTADO
  signupUser(requestDatas: SignupUserRequest):Observable<SignupUserResponse>{
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/user`,
      requestDatas
    );
  }


//METODO DE AUTENTICAR USUARIO IMPLEMENTADO
authUser(requestDatas:authRequest):Observable<authResponse>{
  return this.http.post<authResponse>(
    `${this.API_URL}auth`,
    requestDatas
  );

}

}
