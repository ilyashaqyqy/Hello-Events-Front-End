
import { Users } from './users';
import { Event } from './event';

export interface Booking {
  idBooking: number;
  bookingDate: string; 
  user: Users;
  event: Event;
}
