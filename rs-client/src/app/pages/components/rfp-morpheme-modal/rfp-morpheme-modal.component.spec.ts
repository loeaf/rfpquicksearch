import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpMorphemeModalComponent } from './rfp-morpheme-modal.component';

describe('RfpMorphemeModalComponent', () => {
  let component: RfpMorphemeModalComponent;
  let fixture: ComponentFixture<RfpMorphemeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpMorphemeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpMorphemeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
