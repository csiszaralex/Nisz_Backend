import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // listInfected(): Promise<InfectedUserDto[]> {
  //   return this.userRepository.listInfected();
  // }

  // async createUser(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
  //   const { name, email, password } = createUserDto;
  //   await this.userRepository.createUser(name, email, password);
  //   return await this.signinUser({ email, password });
  // }

  // async signinUser(signinUserDto: SigninUserDto): Promise<{ accessToken: string }> {
  //   const { email, password } = signinUserDto;
  //   const user = await this.userRepository.signinUser(email, password);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const permissionCodes = user.permissions.map(permission => permission.code);
  //   const payload: JwtPayloadInterface = {
  //     email: user.email,
  //     permissions: permissionCodes,
  //     id: user.id,
  //   };
  //   const accessToken = await this.jwtService.sign(payload);
  //   return { accessToken };
  // }

  // iHaveCovid(id: number): Promise<string> {
  //   return this.userRepository.iHaveCovid(id, new Date());
  // }

  // addPermission(code: string, id: number) {
  //   return this.userRepository.addPermission(code.toUpperCase(), id);
  // }

  // removePermission(code: string, id: number) {
  //   return this.userRepository.removePermission(code.toUpperCase(), id);
  // }
}
