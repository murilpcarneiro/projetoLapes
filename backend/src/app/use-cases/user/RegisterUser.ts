import { IUserRepository } from 'app/repositories/IUserRepository';
import bcrypt from 'bcrypt';
import { User } from 'domain/entities/User';

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

interface RegisteredUserDTO {
  id?: number;
  name: string;
  email: string;
  role: string;
}

export class RegisterUser {
  constructor(private userRepo: IUserRepository) {}

  async execute({ name, email, password }: RegisterUserInput): Promise<RegisteredUserDTO> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('Email já cadastrado');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User(name, email, passwordHash, 'customer');

    await this.userRepo.save(user);

    return user.toJSON();
  }
}