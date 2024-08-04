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
        const role = this.authService.getRole();
        console.log('Role after login:', role);
        if (role === 'ROLE_ADMIN') {
          console.log('Attempting to navigate to dashboard');
          this.router.navigate(['/dashboard']);
        } else {
          console.log('Attempting to navigate to home');
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}