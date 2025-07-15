import type { IUserRepository } from "app/repositories/IUserRepository";

interface GetUserInput {
  userEmail: string;
}

interface GetUserDTO {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  }
}

export class GetUser{
  constructor(private userRepository: IUserRepository) {}

  async execute({userEmail}: GetUserInput): Promise<GetUserDTO> {
    if (!userEmail) throw new Error('ID do usuário é obrigatório');
    
    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) throw new Error('Usuário não encontrado');

    return {
      user: {
        id: user.id!,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}