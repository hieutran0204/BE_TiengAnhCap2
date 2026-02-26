import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //email và password ở đây là 2 tham số passport truyền vào
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      const IsValid = this.userService.IsValidPassword(pass, user.password);
      if (IsValid === true) {
        const { password, ...result } = user.toObject();
        return result;
      }
    }
    return null;
  }
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
