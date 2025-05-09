import { Component } from '@angular/core';
import { AdminMovieCardComponent } from "../../components/admin-movie-card/admin-movie-card.component";
import { Movie } from '../../models/Movie';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [AdminMovieCardComponent,CommonModule,RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  movies: Movie []= [];
    
        constructor(private _moviesservice: MoviesService, private authservice: AuthService, private router: Router) {}
    
        ngOnInit(): void {
          this._moviesservice.getMovies().subscribe(data => {
            this.movies = data;
            // console.log(this.movies);
          });        
        }

        logout(): void {
          this.authservice.logout();         // Clears token + emits false
          this.router.navigate(['/login']);  // Redirect to login page
        }
}
