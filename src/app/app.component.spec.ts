import { TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { CarService } from './services/car.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterLink,
        RouterModule.forRoot([])
      ],
      providers: [CarService, provideRouter([])],
      declarations: [
        AppComponent,
        CarComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CarComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
