import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EBookService } from './e-book.service';
import { CreateEBookDto } from './dto/create-e-book.dto';
import { UpdateEBookDto } from './dto/update-e-book.dto';

@Controller('e-book')
export class EBookController {
  constructor(private readonly eBookService: EBookService) {}

  @Post()
  create(@Body() createEBookDto: CreateEBookDto) {
    return this.eBookService.create(createEBookDto);
  }

  @Get()
  findAll() {
    return this.eBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eBookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEBookDto: UpdateEBookDto) {
    return this.eBookService.update(+id, updateEBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eBookService.remove(+id);
  }
}
