import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsEmployeesComponent } from './contacts-employees.component';

describe('ContactsEmployeesComponent', () => {
  let component: ContactsEmployeesComponent;
  let fixture: ComponentFixture<ContactsEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
