import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsGroupsComponent } from './contacts-groups.component';

describe('ContactsGroupsComponent', () => {
  let component: ContactsGroupsComponent;
  let fixture: ComponentFixture<ContactsGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
