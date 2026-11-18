import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Usuarioscomponent } from './usuarioscomponent';

describe('Usuarioscomponent', () => {
  let component: Usuarioscomponent;
  let fixture: ComponentFixture<Usuarioscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Usuarioscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Usuarioscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
