import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from '../components/car/car.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CarComponent],
  exports: [CarComponent]
})
export class CarModule { }
