import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { SignupUserRequest } from 'src/app/models/user/SignupUserRequest';
import { authRequest } from 'src/app/models/user/auth/authRequest';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy,AfterViewInit {
  @ViewChild('emailInput') public emailInputRef!: ElementRef;
  @ViewChild('passwordInput') public passwordInputRef!: ElementRef;

  private destroy$ = new Subject<void>();
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
   // this.emailInputRef.nativeElement.value = 'Seu Email Aqui';
   // this.passwordInputRef.nativeElement.value = 'Senha';
   // console.log("EMAIL INPUT =>",this.emailInputRef.nativeElement);
   // console.log("PASSWORD INPUT =>",this.passwordInputRef.nativeElement);
  }

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as authRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem vindo de volta ${response?.name}`,
              life: 2000,
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Erro ao fazer login`,
            life: 2000,
          });
          console.log(err)},
      });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignupUserRequest)
        .pipe(
          takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.signupForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Usuario cadastrado com sucesso`,
                life: 2500,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Erro ao criar usuario.`,
              life: 2500,
            });
            console.log(err)},
        });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
