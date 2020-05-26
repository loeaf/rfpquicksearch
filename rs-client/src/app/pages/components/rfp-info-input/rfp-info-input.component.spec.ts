import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpInfoInputComponent } from './rfp-info-input.component';

describe('RfpInfoInputComponent', () => {
  let component: RfpInfoInputComponent;
  let fixture: ComponentFixture<RfpInfoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpInfoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpInfoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
