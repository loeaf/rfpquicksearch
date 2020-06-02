import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpMorpCombinModalComponent } from './rfp-morp-combin-modal.component';

describe('RfpMorpCombinModalComponent', () => {
  let component: RfpMorpCombinModalComponent;
  let fixture: ComponentFixture<RfpMorpCombinModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpMorpCombinModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpMorpCombinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
