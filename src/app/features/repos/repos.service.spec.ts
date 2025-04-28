import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReposService } from './repos.service';

describe('ReposService', () => {
  let service: ReposService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});