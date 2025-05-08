import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Movie {
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  rating: number;
  genres: string[];
  imageUrl: string;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddMoviesService {

  private apiUrl = 'http://localhost:5199/api/movies';
  private apiImage = 'http://localhost:5199/api/movies/uploadData';

  constructor(private http: HttpClient) {}

  addMovie(movie: Movie): Observable<any> {
    return this.http.post(this.apiUrl, movie);
  }

  uploadData(formData:FormData):Observable<{ url: string }>{
    return this.http.post<{ url: string }>(this.apiImage,formData);
  }

}
