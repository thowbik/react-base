import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedlabelComponent } from './sharedlabel.component';

describe('SharedlabelComponent', () => {
  let component: SharedlabelComponent;
  let fixture: ComponentFixture<SharedlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
