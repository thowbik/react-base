import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsConnectedComponent } from './contacts-connected.component';

describe('ContactsConnectedComponent', () => {
  let component: ContactsConnectedComponent;
  let fixture: ComponentFixture<ContactsConnectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsConnectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
