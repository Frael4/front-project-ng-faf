import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableArbComponent } from './table-arb.component';

describe('TableArbComponent', () => {
  let component: TableArbComponent;
  let fixture: ComponentFixture<TableArbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableArbComponent]
    });
    fixture = TestBed.createComponent(TableArbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
