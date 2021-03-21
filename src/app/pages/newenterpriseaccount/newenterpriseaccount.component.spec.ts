import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewenterpriseaccountComponent } from './newenterpriseaccount.component';

describe('NewenterpriseaccountComponent', () => {
  let component: NewenterpriseaccountComponent;
  let fixture: ComponentFixture<NewenterpriseaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewenterpriseaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewenterpriseaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
