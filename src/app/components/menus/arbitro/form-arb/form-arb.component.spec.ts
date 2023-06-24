import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArbComponent } from './form-arb.component';

describe('FormArbComponent', () => {
  let component: FormArbComponent;
  let fixture: ComponentFixture<FormArbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormArbComponent]
    });
    fixture = TestBed.createComponent(FormArbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
