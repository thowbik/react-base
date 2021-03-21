import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactimportComponent } from './contactimport.component';

describe('ContactimportComponent', () => {
  let component: ContactimportComponent;
  let fixture: ComponentFixture<ContactimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
