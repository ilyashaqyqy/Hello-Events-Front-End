import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: any; 
  loading = true;
  error: any;
  authService: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.loadEvent(id);
    });
  }

  loadEvent(id: number): void {
    this.eventService.getEventById(id).subscribe({
      next: (data) => {
        this.event = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}
