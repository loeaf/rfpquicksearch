import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorpSearchListComponent } from './morp-search-list.component';

describe('MorpSearchListComponent', () => {
  let component: MorpSearchListComponent;
  let fixture: ComponentFixture<MorpSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorpSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorpSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
