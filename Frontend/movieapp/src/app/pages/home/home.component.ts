import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    movies = [
      {
        title: 'The Batman',
        imageUrl: 'https://i.pinimg.com/originals/37/ec/34/37ec346f9cd8b1097f2cd821e208e72e.jpg',
      },
      {
        title: 'Inception',
        imageUrl: 'https://cdn.shopify.com/s/files/1/1416/8662/products/inception_2010_imax_original_film_art_2000x.jpg?v=1551890318',
      },
      {
        title: 'Interstellar',
        imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/297acd129204217.616629e21fe76.png',
      },
      {
        title: 'Tenet',
        imageUrl: 'https://image.tmdb.org/t/p/original/ylQRi3edixhzUiubw7LQP1YhI6W.jpg',
      },
      {
        title: 'Avengers: Endgame',
        imageUrl: 'https://images.pristineauction.com/162/1629305/main_1601050459-Avengers-End-Game-24x36-Movie-Poster-PristineAuction.com.jpg',
      },
      {
        title: 'Joker',
        imageUrl: 'https://i0.wp.com/batman-news.com/wp-content/uploads/2019/08/Joker-Official-Images-Final-Poster-03.jpg?fit=1057%2C1572&quality=80&strip=info&ssl=1',
      },
    ];
  
}
