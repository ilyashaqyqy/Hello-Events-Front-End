// src/app/client/event-booking/event-booking.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css']
})
export class EventBookingComponent implements OnInit {
  event: any;
  numTickets: number = 1;
  loading = true;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private bookingService: BookingService,
    private authService: AuthService,
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

  bookEvent(): void {
    const userId = this.authService.getUserId(); // Get the user ID
    if (!userId) {
      alert('Please log in to book an event.');
      return;
    }
  
    const bookingData = {
      bookingDate: new Date().toISOString(), // Adjust as necessary
      user: {
        idUser: userId // Ensure this matches the backend's expectation
      },
      event: {
        idEvent: this.event.idEvent
      }
    };
  
    this.bookingService.createBooking(bookingData).subscribe({
      next: () => {
        alert('Booking successful!');
        this.router.navigate(['/reservations']);
      },
      error: (err) => {
        console.error('Booking failed:', err);
        alert('Booking failed. Please try again later.');
      }
    });
  }
  
}
