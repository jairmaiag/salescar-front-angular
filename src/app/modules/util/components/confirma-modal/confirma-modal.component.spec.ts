import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaModalComponent } from './confirma-modal.component';

describe('ConfirmaModalComponent', () => {
  let component: ConfirmaModalComponent;
  let fixture: ComponentFixture<ConfirmaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
