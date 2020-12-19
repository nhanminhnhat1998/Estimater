import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauThangComponent } from './cau-thang.component';

describe('CauThangComponent', () => {
  let component: CauThangComponent;
  let fixture: ComponentFixture<CauThangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauThangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauThangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
