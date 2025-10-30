import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { instanceToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll() {
    const allUSers = await this.userRepository.find();
    return instanceToInstance(allUSers);
  }

  async findOne(id: User['id']) {
    return await this.userRepository.findOneBy({ id })?.then((user) => instanceToInstance(user));
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
