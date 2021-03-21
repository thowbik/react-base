import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateroleComponent } from './duplicaterole.component';

describe('DuplicateroleComponent', () => {
  let component: DuplicateroleComponent;
  let fixture: ComponentFixture<DuplicateroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
