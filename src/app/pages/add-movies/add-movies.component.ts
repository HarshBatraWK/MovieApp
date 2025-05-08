import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-movies',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './add-movies.component.html',
  styleUrl: './add-movies.component.css'
})
export class AddMoviesComponent {

  movieForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    releaseDate: new FormControl('', Validators.required),
    duration: new FormControl('', [Validators.required, Validators.min(1)]),
    rating: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    imageUrl: new FormControl('', [Validators.required, Validators.pattern('https?://.*')]),
    videoUrl: new FormControl('', [Validators.required, Validators.pattern('https?://.*')]),
  });

  onSubmit(): void {
    if (this.movieForm.valid) {
      console.log(this.movieForm.value);  // Here you can process the form data (e.g., send it to the backend)
    } else {
      console.log('Form is invalid');
    }
  }

}
