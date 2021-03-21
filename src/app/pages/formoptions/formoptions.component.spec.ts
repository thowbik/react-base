import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormoptionsComponent } from './formoptions.component';

describe('FormoptionsComponent', () => {
  let component: FormoptionsComponent;
  let fixture: ComponentFixture<FormoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
