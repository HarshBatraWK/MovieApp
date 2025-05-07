import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() imgUrl: string = '';  
  
  get movieroute(): string {
    return "/movie/" + this.id;
  }
}
