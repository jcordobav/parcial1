/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';

import { CarComponent } from './car.component';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';

describe('CarComponent', () => {
  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;
  let carServiceSpy: jasmine.SpyObj<CarService>;

  const mockCars: Car[] = [
    { marca: 'Toyota', linea: 'Corolla', modelo: 2020 } as any,
    { marca: 'Honda', linea: 'Civic', modelo: 2019 } as any
  ];

  beforeEach(async () => {
    carServiceSpy = jasmine.createSpyObj('CarService', ['getCars']);
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [CarComponent],
      providers: [{ provide: CarService, useValue: carServiceSpy }]
    }).compileComponents();
  });

  it('should create', () => {
    carServiceSpy.getCars.and.returnValue(of([]));
    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call getCars on init and render table rows', () => {
    carServiceSpy.getCars.and.returnValue(of(mockCars));
    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // runs ngOnInit
    expect(carServiceSpy.getCars).toHaveBeenCalled();
    expect(component.cars.length).toBe(mockCars.length);

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockCars.length);
    // verify first row content
    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('Toyota');
    expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('Corolla');
    expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('2020');
  });

  it('should set loading true while waiting for service and then false after response', () => {
    const subject = new Subject<Car[]>();
    carServiceSpy.getCars.and.returnValue(subject.asObservable());

    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;

    // start ngOnInit
    fixture.detectChanges();
    // subscription active but no value emitted yet
    expect(component.loading).toBeTrue();
    // now emit data
    subject.next(mockCars);
    subject.complete();
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
    expect(component.cars.length).toBe(mockCars.length);
  });

  it('should render image with expected src attribute', () => {
    carServiceSpy.getCars.and.returnValue(of([]));
    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const imgDebug = fixture.debugElement.query(By.css('img'));
    expect(imgDebug).toBeTruthy();
    const src = imgDebug.nativeElement.getAttribute('src');
    // acepta rutas relativas que terminen en image.png
    expect(src).toMatch(/image\.png$/);
    expect(imgDebug.nativeElement.getAttribute('alt')).toContain('Imagen del carro');
  });
});