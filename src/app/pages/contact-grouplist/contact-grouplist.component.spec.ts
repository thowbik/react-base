import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactGrouplistComponent } from './contact-grouplist.component';

describe('ContactGrouplistComponent', () => {
  let component: ContactGrouplistComponent;
  let fixture: ComponentFixture<ContactGrouplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactGrouplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactGrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
