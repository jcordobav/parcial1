import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';
import { Brand } from '../../models/brands.model';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  standalone: false,
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  loading: boolean = false;
  error: string | null = null;
  cars: Car[] = [];
  currentFilter: string = 'all';
  brands: Brand[] = [];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCars();
    
  }

  getCars(): void {
    this.loading = true;
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.loading = false;
        this.calculateTotalBrandCars();
      },
      error: (error) => {
        this.error = 'Error al cargar los carros';
        this.loading = false;
        console.error('Error:', error);
      },
    });
  }

  calculateTotalBrandCars() {
    for (let car of this.cars) {
      if (!this.brands.find((brand) => brand.name === car.marca)) {
        this.brands.push({ name: car.marca, totalCars: 1 });
      } else {
        let brand = this.brands.find((brand) => brand.name === car.marca);
        if (brand) {
          brand.totalCars += 1;
        }
      }
    }
  }
}
