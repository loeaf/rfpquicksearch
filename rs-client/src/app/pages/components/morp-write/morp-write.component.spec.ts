import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorpWriteComponent } from './morp-write.component';

describe('MorpWriteComponent', () => {
  let component: MorpWriteComponent;
  let fixture: ComponentFixture<MorpWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorpWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorpWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
