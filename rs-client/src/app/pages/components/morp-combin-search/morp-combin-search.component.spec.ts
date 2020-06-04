import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorpCombinSearchComponent } from './morp-combin-search.component';

describe('MorpCombinSearchComponent', () => {
  let component: MorpCombinSearchComponent;
  let fixture: ComponentFixture<MorpCombinSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorpCombinSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorpCombinSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
