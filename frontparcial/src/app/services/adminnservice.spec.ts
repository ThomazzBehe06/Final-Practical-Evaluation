import { TestBed } from '@angular/core/testing';
import { Adminnservice } from './adminnservice';

describe('Adminnservice', () => {
  let service: Adminnservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adminnservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
