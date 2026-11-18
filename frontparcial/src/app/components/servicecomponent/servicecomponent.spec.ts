import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Servicecomponent } from './servicecomponent';

describe('Servicecomponent', () => {
  let component: Servicecomponent;
  let fixture: ComponentFixture<Servicecomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Servicecomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Servicecomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
