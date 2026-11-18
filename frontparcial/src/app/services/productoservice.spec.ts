import { TestBed } from '@angular/core/testing';
import { Productosservice } from './productoservice';

describe('Productosservice', () => {
  let service: Productosservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Productosservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
