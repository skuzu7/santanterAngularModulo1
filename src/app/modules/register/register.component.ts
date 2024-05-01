import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/interfaces/user/register-request.interface';


import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const { username, password, email } = this.registrationForm.value;
      const registrationData: RegisterRequest = {
        name: username,
        password,
        email
      };

      this.userService.register(registrationData).subscribe(
        (response) => {
          console.log('Registro bem-sucedido:', response);
          this.navigateToLoginPage();
        },
        (error) => {
          console.error('Erro no registro:', error);
       
        }
      );
    }
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  navigateToLoginPage(): void {
    this.router.navigate(['/home']);
  }

  navigateToHomePage(): void {
    this.router.navigate(['/home']);
  }
}