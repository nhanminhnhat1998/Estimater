import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanSiloComponent } from './than-silo.component';

describe('ThanSiloComponent', () => {
  let component: ThanSiloComponent;
  let fixture: ComponentFixture<ThanSiloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanSiloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanSiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
