import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  getCarDetails(carId: string) {
    return this.http.get(`/api/cars/${carId}`);
  }
}
