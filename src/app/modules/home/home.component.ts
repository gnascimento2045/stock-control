import { UserService } from 'src/app/services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserRequest } from 'src/app/models/user/SignupUserRequest';
import { authRequest } from 'src/app/models/user/auth/authRequest';
import { SignupUserResponse } from 'src/app/models/user/signupUserResponse';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })

  signupForm = this.formBuilder.group({
    name:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private UserService: UserService, private cookieService: CookieService){}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid){
    this.UserService.authUser(this.loginForm.value as authRequest)
    .subscribe({
      next: (response) =>{
        if (response){
          this.cookieService.set('USER_INFO', response?.token);
        }
      }
    })
  }
  }

  onSubmitSignUpForm(): void {
  if (this.signupForm.value && this.signupForm.valid){
    this.UserService.signupUser(
      this.signupForm.value as SignupUserRequest)
      .subscribe({
        next: (response) =>{
          if (response){
          alert('Usuario criado com sucesso');
          this.signupForm.reset();
          this.loginCard = true;
        }
      },
      error: (err) => console.log(err),
      });
    }
  }
}
