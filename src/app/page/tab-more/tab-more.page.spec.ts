import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMorePage } from './tab-more.page';

describe('TabMorePage', () => {
  let component: TabMorePage;
  let fixture: ComponentFixture<TabMorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
