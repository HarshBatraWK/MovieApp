import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMovieCardComponent } from './admin-movie-card.component';

describe('AdminMovieCardComponent', () => {
  let component: AdminMovieCardComponent;
  let fixture: ComponentFixture<AdminMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMovieCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
