import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../models/Genre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private baseUrl: string = "http://localhost:5199/api/Genres/";

  constructor(private http: HttpClient) {}

  private movies: Genre[] = [];

  getMovies() : Observable<Genre[]> {
      return this.http.get<Genre[]>(`${this.baseUrl}`);
    }
}
