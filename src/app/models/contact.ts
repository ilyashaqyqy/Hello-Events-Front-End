import { Users } from './users';

export interface Contact {
  idContact: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt: string; 
  user: Users; 
}

