import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosDetalheComponent } from './carros-detalhe.component';

describe('CarrosDetalheComponent', () => {
  let component: CarrosDetalheComponent;
  let fixture: ComponentFixture<CarrosDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrosDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrosDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
