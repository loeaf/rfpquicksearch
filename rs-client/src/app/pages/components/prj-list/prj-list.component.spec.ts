import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjListComponent } from './prj-list.component';

describe('PrjListComponent', () => {
  let component: PrjListComponent;
  let fixture: ComponentFixture<PrjListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
