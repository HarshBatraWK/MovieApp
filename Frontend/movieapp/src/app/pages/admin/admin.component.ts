import { Component } from '@angular/core';
import { AdminMovieCardComponent } from "../../components/admin-movie-card/admin-movie-card.component";
import { Movie } from '../../models/Movie';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [AdminMovieCardComponent,CommonModule,RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  movies: Movie []= [];
    
        constructor(private _moviesservice: MoviesService) {}
    
        ngOnInit(): void {
          this._moviesservice.getMovies().subscribe(data => {
            this.movies = data;
            console.log(this.movies);
          });        
        }
}
