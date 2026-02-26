import { Test, TestingModule } from '@nestjs/testing';
import { EBookController } from './e-book.controller';
import { EBookService } from './e-book.service';

describe('EBookController', () => {
  let controller: EBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EBookController],
      providers: [EBookService],
    }).compile();

    controller = module.get<EBookController>(EBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
