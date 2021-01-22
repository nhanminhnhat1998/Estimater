import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { KhoangComponent } from "./khoang.component";

describe("KhoangComponent", () => {
  let component: KhoangComponent;
  let fixture: ComponentFixture<KhoangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KhoangComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhoangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
