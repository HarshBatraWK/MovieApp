import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-movie-card',
  imports: [CommonModule],
  templateUrl: './admin-movie-card.component.html',
  styleUrl: './admin-movie-card.component.css'
})
export class AdminMovieCardComponent {

  @Input() movie: any;

  onUpdate(id: number) {
    console.log('Update movie:', id);
    // Add routing or update logic
  }

  onDelete(id: number) {
    console.log('Delete movie:', id);
    // Add delete logic
  }

}
