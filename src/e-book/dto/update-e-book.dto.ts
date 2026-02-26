import { PartialType } from '@nestjs/mapped-types';
import { CreateEBookDto } from './create-e-book.dto';

export class UpdateEBookDto extends PartialType(CreateEBookDto) {}
