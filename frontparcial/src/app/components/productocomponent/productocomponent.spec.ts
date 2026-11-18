import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Productocomponent } from './productocomponent';

describe('Productocomponent', () => {
  let component: Productocomponent;
  let fixture: ComponentFixture<Productocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Productocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Productocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
