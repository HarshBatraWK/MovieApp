import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../models/Genre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private baseUrl: string = "http://localhost:5199/api/Genres/getallgenres";

  constructor(private http: HttpClient) {}

  private movies: Genre[] = [];

  getGenres() : Observable<string[]> {
      return this.http.get<string[]>(`${this.baseUrl}`);
    }
}
