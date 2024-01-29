import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserRequest } from 'src/app/models/user/SignupUserRequest';
import { SignupUserResponse } from 'src/app/models/user/signupUserResponse';

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

  constructor(private formBuilder: FormBuilder, private UserService: UserService){}

  onSubmitLoginForm(): void {
      console.log('DADOS DO FORMULÁRIO DE LOGIN', this.loginForm.value);
  };

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
