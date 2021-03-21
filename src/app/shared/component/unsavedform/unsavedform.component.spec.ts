import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsavedformComponent } from './unsavedform.component';

describe('UnsavedformComponent', () => {
  let component: UnsavedformComponent;
  let fixture: ComponentFixture<UnsavedformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsavedformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsavedformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
