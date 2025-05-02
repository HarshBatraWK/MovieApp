import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-moviesection',
  imports: [MovieCardComponent, CommonModule, RouterModule],
  templateUrl: './moviesection.component.html',
  styleUrl: './moviesection.component.css'
})
export class MoviesectionComponent implements OnInit {
  @Input() title: string = "";

  movies: any[] = [];

  constructor(private _moviesservice: MoviesService) {}

  ngOnInit(): void {
    this.movies = this._moviesservice.getMoviesByGenre();
  }


}
