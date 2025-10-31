import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  standalone: false,
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  loading: boolean = false;
  error: string | null = null;
  cars: Car[] = [];
  currentFilter: string = 'all';

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.getCars();
    
  }

  getCars(): void {
    this.loading = true;
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.loading = false;
        console.log(this.cars);
      },
      error: (error) => {
        this.error = 'Error al cargar los carros';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

}
