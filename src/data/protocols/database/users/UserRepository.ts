import { IUser } from '@/domain/entities/User';

export interface IDBCreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  findById: (id: string) => Promise<IUser | undefined>;

  findByEmail: (email: string) => Promise<IUser | undefined>;

  create: (data: IDBCreateUserDTO) => Promise<IUser>;

  save: (user: IUser) => Promise<IUser>;
}
