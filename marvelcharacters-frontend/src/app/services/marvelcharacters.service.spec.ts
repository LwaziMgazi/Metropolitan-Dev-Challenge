import { TestBed } from '@angular/core/testing';

import { MarvelcharactersService } from './marvelcharacters.service';

describe('MarvelcharactersService', () => {
  let service: MarvelcharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarvelcharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
