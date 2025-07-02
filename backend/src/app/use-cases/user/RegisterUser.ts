// src/application/use-cases/user/RegisterUser.ts
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
    // 1. verifica negócio (e-mail único)
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('Email já cadastrado');

    // 2. cria a entidade (regras de domínio aplicadas no constructor)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User(name, email, passwordHash, 'customer');

    // 3. persiste usando a porta IUserRepository
    await this.userRepo.save(user);

    // 4. retorna DTO sem a senha
    return user.toJSON();
  }
}
