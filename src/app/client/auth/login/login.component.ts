// src/app/client/auth/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: any) {
    const { username, password } = form.value;
    this.authService.login(username, password).subscribe(
      response => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']); // Redirect to home
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
