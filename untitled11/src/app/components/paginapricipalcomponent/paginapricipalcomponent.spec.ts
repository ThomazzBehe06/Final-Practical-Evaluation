import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paginapricipalcomponent } from './paginapricipalcomponent';

describe('Paginapricipalcomponent', () => {
  let component: Paginapricipalcomponent;
  let fixture: ComponentFixture<Paginapricipalcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Paginapricipalcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Paginapricipalcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
