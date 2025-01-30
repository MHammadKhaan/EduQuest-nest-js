import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto, manager: EntityManager) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user)
      throw new BadRequestException(
        `user already exist with this email ${createUserDto.email}`,
      );
    const createUser = manager.create(User, createUserDto); //
    const { password, ...registerUser } = await manager.save(User, createUser); //
    return registerUser;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email=:email', { email })
      .getOne();

    if (!user)
      throw new NotFoundException(
        `user not fount with provided email: ${JSON.stringify(email)}`,
      );

    return user;
  }

  async findAll(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['teacher', 'student'],
    });
    if (!user) throw new NotFoundException(`user not found with the id ${id}`);

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  check() {
    return 'test commit';
  }
}
