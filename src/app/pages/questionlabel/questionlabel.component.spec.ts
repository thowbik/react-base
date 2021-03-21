import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionlabelComponent } from './questionlabel.component';

describe('QuestionlabelComponent', () => {
  let component: QuestionlabelComponent;
  let fixture: ComponentFixture<QuestionlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
