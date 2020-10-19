import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOpenerComponent } from './modal-opener.component';

describe('ModalOpenerComponent', () => {
  let component: ModalOpenerComponent;
  let fixture: ComponentFixture<ModalOpenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOpenerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
