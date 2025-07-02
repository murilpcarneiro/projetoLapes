import { IUserRepository } from 'app/repositories/IUserRepository';
import { compare } from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from 'utils/jwt';

interface LoginInput {
  email: string;
  password: string;
}

interface LoginDTO {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export class LoginUser {
  constructor(private userRepo: IUserRepository) {}

  async execute({ email, password }: LoginInput): Promise<LoginDTO> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');

    const valid = await compare(password, user.passwordHash);
    if (!valid) throw new Error('Senha incorreta');

    const payload = { id: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id!,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
