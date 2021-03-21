import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakegroupComponent } from './makegroup.component';

describe('MakegroupComponent', () => {
  let component: MakegroupComponent;
  let fixture: ComponentFixture<MakegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
