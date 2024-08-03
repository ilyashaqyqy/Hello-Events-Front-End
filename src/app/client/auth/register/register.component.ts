// src/app/client/auth/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest: RegisterRequest = {
    email: '',
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']) // Redirect to login
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }
}
