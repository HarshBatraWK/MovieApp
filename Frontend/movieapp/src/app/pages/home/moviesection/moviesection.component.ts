import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../../models/Movie';


@Component({
  selector: 'app-moviesection',
  imports: [MovieCardComponent, CommonModule, RouterModule],
  templateUrl: './moviesection.component.html',
  styleUrl: './moviesection.component.css'
})
export class MoviesectionComponent implements OnInit {
  @Input() genre: string = "";

  movies: Movie[] = [];

  constructor(private _moviesservice: MoviesService) { }

  ngOnInit(): void {
    if (this.genre == "All Movies") {
      this._moviesservice.getMovies().subscribe(data => {
        this.movies = data;
      });
    } else {
      this._moviesservice.getMoviesByGenre(this.genre).subscribe(data => {
        this.movies = data;
      });
    }
  }


}
