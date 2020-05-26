import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpListComponent } from './rfp-list.component';

describe('RfpListComponent', () => {
  let component: RfpListComponent;
  let fixture: ComponentFixture<RfpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
