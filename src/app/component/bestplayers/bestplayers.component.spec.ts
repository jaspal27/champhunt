import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestplayersComponent } from './bestplayers.component';

describe('BestplayersComponent', () => {
  let component: BestplayersComponent;
  let fixture: ComponentFixture<BestplayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestplayersComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
