import { Booking } from './booking';

export interface Users {
  idUser: number;
  username: string;
  password: string;
  email: string;
  role: string; 
  bookings: Booking[]; 
}
