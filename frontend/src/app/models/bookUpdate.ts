import { BookStatus } from './book-status';

export interface BookUpdate {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  status: BookStatus;
}
