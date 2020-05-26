import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjRegistComponent } from './prj-regist.component';

describe('PrjRegistComponent', () => {
  let component: PrjRegistComponent;
  let fixture: ComponentFixture<PrjRegistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjRegistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjRegistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
