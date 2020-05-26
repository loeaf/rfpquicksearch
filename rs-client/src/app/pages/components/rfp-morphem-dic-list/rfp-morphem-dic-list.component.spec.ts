import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpMorphemDicListComponent } from './rfp-morphem-dic-list.component';

describe('RfpMorphemDicListComponent', () => {
  let component: RfpMorphemDicListComponent;
  let fixture: ComponentFixture<RfpMorphemDicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpMorphemDicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpMorphemDicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
