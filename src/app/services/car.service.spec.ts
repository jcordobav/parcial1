/* ...existing code... */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CarService } from './car.service';
import { Car } from '../models/car.model';
import { environment } from '../environments/environment';

describe('CarService', () => {
  let service: CarService;
  let httpMock: HttpTestingController;

  const mockCars: Car[] = [
    { marca: 'Toyota', linea: 'Corolla', modelo: 2020 } as any,
    { marca: 'Honda', linea: 'Civic', modelo: 2019 } as any
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarService]
    });
    service = TestBed.inject(CarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCars() should perform GET to environment.baseUrl and return cars', (done) => {
    service.getCars().subscribe({
      next: (cars) => {
        expect(cars).toEqual(mockCars);
        done();
      },
      error: () => fail('should not error')
    });

    const req = httpMock.expectOne(environment.baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCars);
  });

  it('getCars() should propagate HTTP error', (done) => {
    service.getCars().subscribe({
      next: () => fail('expected an error'),
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      }
    });

    const req = httpMock.expectOne(environment.baseUrl);
    req.flush('Server error', { status: 500, statusText: 'Server Error' });
  });
});