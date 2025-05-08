import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesectionComponent } from './moviesection.component';

describe('MoviesectionComponent', () => {
  let component: MoviesectionComponent;
  let fixture: ComponentFixture<MoviesectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
