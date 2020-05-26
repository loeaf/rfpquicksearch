import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpRegistComponent } from './rfp-regist.component';

describe('RfpRegistComponent', () => {
  let component: RfpRegistComponent;
  let fixture: ComponentFixture<RfpRegistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpRegistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpRegistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
