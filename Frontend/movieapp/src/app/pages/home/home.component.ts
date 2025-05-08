import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviesectionComponent } from './moviesection/moviesection.component';
import { Movie } from '../../models/Movie';
import { GenreService } from '../../services/genre.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MoviesectionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    genres: string[] = [];

    constructor(private genreservice: GenreService) {}

    ngOnInit(): void {
      this.genreservice.getGenres().subscribe(data => {
        this.genres = data;
      });
    }
}
