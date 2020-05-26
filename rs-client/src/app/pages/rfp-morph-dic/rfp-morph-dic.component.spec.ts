import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpMorphDicComponent } from './rfp-morph-dic.component';

describe('RfpMorphDicComponent', () => {
  let component: RfpMorphDicComponent;
  let fixture: ComponentFixture<RfpMorphDicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpMorphDicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpMorphDicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
