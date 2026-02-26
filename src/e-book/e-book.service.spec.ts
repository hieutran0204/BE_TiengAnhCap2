import { Test, TestingModule } from '@nestjs/testing';
import { EBookService } from './e-book.service';

describe('EBookService', () => {
  let service: EBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EBookService],
    }).compile();

    service = module.get<EBookService>(EBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
