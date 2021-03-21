import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondersComponent } from './responders.component';

describe('RespondersComponent', () => {
  let component: RespondersComponent;
  let fixture: ComponentFixture<RespondersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
