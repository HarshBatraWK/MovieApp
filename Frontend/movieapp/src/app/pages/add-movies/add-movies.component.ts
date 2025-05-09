import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AddMoviesService, Movie } from '../../services/add-movies.service';

@Component({
  selector: 'app-add-movies',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './add-movies.component.html',
  styleUrl: './add-movies.component.css',
})
export class AddMoviesComponent {
  genreArray: string[] = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Sci-Fi',
    'Romance',
    'Adventure',
  ];

  constructor(
    private addMoviesService: AddMoviesService,
    private router: Router
  ) {}

  movieForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
    ]),
    releaseDate: new FormControl('', Validators.required),
    duration: new FormControl(0, [Validators.required, Validators.min(1)]),
    rating: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    imageUrl: new FormControl('', [
      Validators.required,
      Validators.pattern('https?://.*'),
    ]),
    videoUrl: new FormControl('', [
      Validators.required,
      Validators.pattern('https?://.*'),
    ]),
    genres: new FormControl([]),
  });

  onSubmit(): void {
    console.log(this.movieForm.value);
    if (this.movieForm.valid) {
      // Create movie object from form values
      const movie: Movie = this.movieForm.value as Movie;

      // Call the addMovie function from the service
      this.addMoviesService.addMovie(movie).subscribe({
        next: (res) => {
          console.log('Movie added successfully', res);
          // Optionally reset the form or handle further UI updates
          this.movieForm.reset();
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error('Failed to add movie', err);
          // Handle error (e.g., show a message to the user)
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onFileSelect(event: Event, type: 'image' | 'video') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      // formData.append('isImage', type === 'image' ? 'true' : 'false');
      const isImage = type === 'image';

      this.addMoviesService.uploadData(formData, isImage).subscribe({
        next: (res) => {
          console.log(`${type} uploaded successfully`, res);
          // Optionally update form control with response data
          this.movieForm.get(`${type}Url`)?.setValue(res.url);
        },
        error: (err) => {
          console.error(`Failed to upload ${type}`, err);
        },
      });
    }
  }

  
}
