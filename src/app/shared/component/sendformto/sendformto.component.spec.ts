import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendformtoComponent } from './sendformto.component';

describe('SendformtoComponent', () => {
  let component: SendformtoComponent;
  let fixture: ComponentFixture<SendformtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendformtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendformtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
