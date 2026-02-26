import { Injectable } from '@nestjs/common';
import { CreateEBookDto } from './dto/create-e-book.dto';
import { UpdateEBookDto } from './dto/update-e-book.dto';

@Injectable()
export class EBookService {
  create(createEBookDto: CreateEBookDto) {
    return 'This action adds a new eBook';
  }

  findAll() {
    return `This action returns all eBook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eBook`;
  }

  update(id: number, updateEBookDto: UpdateEBookDto) {
    return `This action updates a #${id} eBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} eBook`;
  }
}
