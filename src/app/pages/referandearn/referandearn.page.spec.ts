import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferandearnPage } from './referandearn.page';

describe('ReferandearnPage', () => {
  let component: ReferandearnPage;
  let fixture: ComponentFixture<ReferandearnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferandearnPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferandearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
