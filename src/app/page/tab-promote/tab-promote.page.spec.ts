import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPromotePage } from './tab-promote.page';

describe('TabPromotePage', () => {
  let component: TabPromotePage;
  let fixture: ComponentFixture<TabPromotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPromotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPromotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
