import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Car } from '../models/car.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCars() : Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }
}
