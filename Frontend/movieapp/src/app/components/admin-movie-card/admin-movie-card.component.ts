import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddMoviesService } from '../../services/add-movies.service';

@Component({
  selector: 'app-admin-movie-card',
  imports: [CommonModule],
  templateUrl: './admin-movie-card.component.html',
  styleUrl: './admin-movie-card.component.css'
})
export class AdminMovieCardComponent {

  @Input() movie: any;

  constructor(private addMovieService:AddMoviesService){}

  onUpdate(id: number) {
    console.log('Update movie:', id);
    // Add routing or update logic
  }

  onDelete(id: string): void {
    // Calling deleteMovie method from the service
    this.addMovieService.deleteMovie(id).subscribe({
      next: (res) => {
        console.log(`Movie with ID: ${id} deleted successfully`, res);
        // Optionally, you can refresh or update your UI here
      },
      error: (err) => {
        console.error(`Failed to delete movie with ID: ${id}`, err);
      },
    });
  }

}
