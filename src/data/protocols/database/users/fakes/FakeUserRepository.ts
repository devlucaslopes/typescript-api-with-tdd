import { IUser } from '@/domain/entities/User';
import { IUserRepository, IDBCreateUserDTO } from '../UserRepository';

export class FakeUserRepository implements IUserRepository {
  private users: IUser[] = [];

  async findById(id: string): Promise<IUser | undefined> {
    const checkUserExists = this.users.find(user => user.id === id);

    return checkUserExists;
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const checkUserExists = this.users.find(user => user.email === email);

    return checkUserExists;
  }

  async create({ name, email, password }: IDBCreateUserDTO): Promise<IUser> {
    const user = {
      id: 'any_id',
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);

    return user;
  }
}
