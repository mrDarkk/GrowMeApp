import { TestBed, inject } from '@angular/core/testing';

import { StaticresourcesService } from './staticresources.service';

describe('StaticresourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticresourcesService]
    });
  });

  it('should be created', inject([StaticresourcesService], (service: StaticresourcesService) => {
    expect(service).toBeTruthy();
  }));
});
