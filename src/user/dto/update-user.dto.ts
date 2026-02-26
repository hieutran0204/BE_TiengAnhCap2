import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
// dùng OmitType để tạo DTO cập nhật từ DTO tạo có thể bỏ 1 trường bất kì mà mình ko muốn nó cập nhật
// export class UpdateUserDto extends PartialType(CreateUserDto) {
//   email: string;
//   @IsString()
//   @IsNotEmpty({ message: 'Password không được để trống' })
//   password: string;
// }
export class UpdateUserDto extends OmitType(CreateUserDto, ['email'] as const) {
  @IsString()
  @IsNotEmpty({ message: 'Password không được để trống' })
  password: string;
}
