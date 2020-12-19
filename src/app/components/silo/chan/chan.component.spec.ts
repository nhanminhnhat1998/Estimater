import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanComponent } from './chan.component';

describe('ChanComponent', () => {
  let component: ChanComponent;
  let fixture: ComponentFixture<ChanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
