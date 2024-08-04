import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

  constructor(private authService: AuthService, private router: Router) { }
}
