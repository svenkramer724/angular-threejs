import { TestBed } from '@angular/core/testing';

import { GptApiService } from './gpt-api.service';

describe('GptApiService', () => {
  let service: GptApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GptApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
