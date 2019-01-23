import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesubscriptionPage } from './managesubscription.page';

describe('ManagesubscriptionPage', () => {
  let component: ManagesubscriptionPage;
  let fixture: ComponentFixture<ManagesubscriptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesubscriptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesubscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
