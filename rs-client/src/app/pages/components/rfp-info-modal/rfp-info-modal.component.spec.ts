import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpInfoModalComponent } from './rfp-info-modal.component';

describe('RfpInfoModalComponent', () => {
  let component: RfpInfoModalComponent;
  let fixture: ComponentFixture<RfpInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
