import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service'; 
import { Router } from '@angular/router';
import { Event } from '../../models/event'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  events: Event[] = [];
  

  constructor(private authService: AuthService, private router: Router , private eventService: EventService , ) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data: Event[]) => { // Use the imported Event type
        this.events = data;
      },
      error => {
        console.error('Error fetching events', error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}