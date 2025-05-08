import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/Movie';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl: string = "http://localhost:5199/api/Movies/";

  constructor(private http: HttpClient) {}

  private movies: Movie[] = [];

  // private movies = [
  //   {
  //     id: 1,
  //     title: 'The Batman',
  //     description: 'A dark and gritty reboot of the Batman franchise, focusing on a young Bruce Wayne’s detective work.',
  //     releaseDate: new Date('2022-03-04'),
  //     duration: 176,
  //     rating: 8.5,
  //     imgUrl: 'https://i.pinimg.com/originals/37/ec/34/37ec346f9cd8b1097f2cd821e208e72e.jpg',
  //     videoUrl: 'https://www.youtube.com/embed/mqqft2x_Aa4' // YouTube trailer
  //   },
  //   {
  //     id: 2,
  //     title: 'Inception',
  //     description: 'A mind-bending thriller where dreams are the battlefield for corporate espionage.',
  //     releaseDate: new Date('2010-07-16'),
  //     duration: 148,
  //     rating: 8.8,
  //     imgUrl: 'https://cdn.shopify.com/s/files/1/1416/8662/products/inception_2010_imax_original_film_art_2000x.jpg?v=1551890318',
  //     videoUrl: 'https://www.youtube.com/embed/YoHD9XEInc0'
  //   },
  //   {
  //     id: 3,
  //     title: 'Interstellar',
  //     description: 'A team of explorers travel through a wormhole in space in an attempt to save humanity.',
  //     releaseDate: new Date('2014-11-07'),
  //     duration: 169,
  //     rating: 8.6,
  //     imgUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/297acd129204217.616629e21fe76.png',
  //     videoUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E'
  //   },
  //   {
  //     id: 4,
  //     title: 'Tenet',
  //     description: 'A secret agent is tasked with preventing World War III through time inversion.',
  //     releaseDate: new Date('2020-09-03'),
  //     duration: 150,
  //     rating: 7.4,
  //     imgUrl: 'https://image.tmdb.org/t/p/original/ylQRi3edixhzUiubw7LQP1YhI6W.jpg',
  //     videoUrl: 'https://www.youtube.com/embed/LdOM0x0XDMo'
  //   },
  //   {
  //     id: 5,
  //     title: 'Avengers: Endgame',
  //     description: 'The Avengers assemble once more to reverse the damage caused by Thanos.',
  //     releaseDate: new Date('2019-04-26'),
  //     duration: 181,
  //     rating: 8.4,
  //     imgUrl: 'https://images.pristineauction.com/162/1629305/main_1601050459-Avengers-End-Game-24x36-Movie-Poster-PristineAuction.com.jpg',
  //     videoUrl: 'https://www.youtube.com/embed/hA6hldpSTF8'
  //   },
  //   {
  //     id: 6,
  //     title: 'Joker',
  //     description: 'A gritty character study of Arthur Fleck, a failed comedian who descends into madness.',
  //     releaseDate: new Date('2019-10-04'),
  //     duration: 122,
  //     rating: 8.4,
  //     imgUrl: 'https://i0.wp.com/batman-news.com/wp-content/uploads/2019/08/Joker-Official-Images-Final-Poster-03.jpg?fit=1057%2C1572&quality=80&strip=info&ssl=1',
  //     videoUrl: 'https://www.youtube.com/embed/zAGVQLHvwOY'
  //   }
  // ];

  getMoviesByGenre(genre: string) {
    return this.http.get<Movie[]>(`${this.baseUrl}/byGenre/${genre}`);
  }

  getMovies() : Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}`);
  }

  getMoviesById(id: number) : Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl + id}`);
  }
}
