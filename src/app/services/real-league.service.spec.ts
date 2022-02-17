import { TestBed } from '@angular/core/testing';

import { RealLeagueService } from './real-league.service';

describe('RealLeagueService', () => {
  let service: RealLeagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealLeagueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
