import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjInfoInputComponent } from './prj-info-input.component';

describe('PrjInfoInputComponent', () => {
  let component: PrjInfoInputComponent;
  let fixture: ComponentFixture<PrjInfoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjInfoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjInfoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
