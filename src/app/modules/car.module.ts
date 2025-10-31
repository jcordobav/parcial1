import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from '../components/car/car.component';
import { CarService } from '../services/car.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CarComponent],
  providers: [CarService],
  exports: [CarComponent]
})
export class CarModule { }
