import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerficationPage } from './email-verfication.page';

describe('EmailVerficationPage', () => {
  let component: EmailVerficationPage;
  let fixture: ComponentFixture<EmailVerficationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailVerficationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerficationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
