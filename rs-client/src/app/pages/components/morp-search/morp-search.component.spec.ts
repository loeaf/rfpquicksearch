import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorpSearchComponent } from './morp-search.component';

describe('MorpSearchComponent', () => {
  let component: MorpSearchComponent;
  let fixture: ComponentFixture<MorpSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorpSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorpSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
