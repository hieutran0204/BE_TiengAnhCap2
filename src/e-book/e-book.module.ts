import { Module } from '@nestjs/common';
import { EBookService } from './e-book.service';
import { EBookController } from './e-book.controller';

@Module({
  controllers: [EBookController],
  providers: [EBookService],
})
export class EBookModule {}
