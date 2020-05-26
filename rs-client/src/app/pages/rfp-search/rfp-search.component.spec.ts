import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpSearchComponent } from './rfp-search.component';

describe('RfpSearchComponent', () => {
  let component: RfpSearchComponent;
  let fixture: ComponentFixture<RfpSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
