import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getHashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.getHashPassword(createUserDto.password);
    const user = await this.userModel.create({
      email: createUserDto.email,
      password: hashedPassword,
      name: createUserDto.name,
    });
    return user;
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (user) {
        return user;
      } else {
        throw new NotFoundException('Không tim thấy user');
      }
    } catch (error) {
      console.error('Lỗi khi tìm user theo ID:', error);
      throw new BadRequestException('ID không hợp lệ');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updateUser = await this.userModel
        .findByIdAndUpdate(id, { $set: updateUserDto }, { new: true })
        .exec();
      if (updateUser) {
        return updateUser;
      } else {
        throw new NotFoundException('Không tim thấy user');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật user theo ID:', error);
      throw new BadRequestException('ID không hợp lệ');
    }
  }

  async remove(id: string) {
    try {
      const deleteUser = await this.userModel.findByIdAndDelete(id).exec();
      if (deleteUser) {
        return {
          message: 'Xóa user thành công',
          deleteUser: deleteUser.toObject(),
        };
      } else {
        throw new NotFoundException('Không tìm thấy user');
      }
    } catch (error) {
      console.error('Lỗi khi xóa user theo ID:', error);
      throw new BadRequestException('ID không hợp lệ');
    }
  }
  async findOneByEmail(email: string) {
    try {
      const user = await this.userModel
        .findOne({ email })
        //kiểu này để lấy cả password vì mặc định đã set select: false trong schema(ODM của mongoose)
        .select('+password')
        .exec();
      if (user) {
        return user;
      } else {
        throw new NotFoundException('Không tìm thấy user');
      }
    } catch (error) {
      console.error('Lỗi khi tìm user theo email:', error);
      throw new BadRequestException('Email không hợp lệ');
    }
  }
  IsValidPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
