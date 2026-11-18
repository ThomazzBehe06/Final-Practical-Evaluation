import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Listacomponent } from './listacomponent';

describe('Listacomponent', () => {
  let component: Listacomponent;
  let fixture: ComponentFixture<Listacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Listacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
