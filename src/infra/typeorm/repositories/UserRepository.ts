import { getRepository, Repository } from 'typeorm';

import {
  IUserRepository,
  IDBCreateUserDTO,
} from '@/data/protocols/database/user/UserRepository';
import { IUser } from '@/domain/entities/User';
import User from '../entities/User';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({ where: email });

    return user;
  }

  async create({ name, email, password }: IDBCreateUserDTO): Promise<IUser> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }
}

export default UserRepository;
