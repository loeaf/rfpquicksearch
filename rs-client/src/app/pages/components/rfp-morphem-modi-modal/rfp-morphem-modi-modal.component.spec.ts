import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpMorphemModiModalComponent } from './rfp-morphem-modi-modal.component';

describe('RfpMorphemModiModalComponent', () => {
  let component: RfpMorphemModiModalComponent;
  let fixture: ComponentFixture<RfpMorphemModiModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpMorphemModiModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpMorphemModiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
