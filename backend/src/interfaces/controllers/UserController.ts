import { LoginUser } from 'app/use-cases/user/LoginUser';
import { RefreshToken } from 'app/use-cases/user/RefreshToken';
import { RegisterUser } from 'app/use-cases/user/RegisterUser';
import { NextFunction, Request, Response } from 'express';
import { PostgresUserRepository } from 'infra/repositories/PostgresUserRepository';

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    const userRepo = new PostgresUserRepository();
    const registerUser = new RegisterUser(userRepo);

    try {
      const result = await registerUser.execute({ name, email, password });
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body;
  
      const userRepo = new PostgresUserRepository();
      const useCase = new LoginUser(userRepo);
      const result = await useCase.execute({ email, password });
  
      return res.status(200).json(result)
    } catch (err) {
      next(err);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ error: 'Refresh token ausente' });

      const useCase = new RefreshToken();
      const result = await useCase.execute({ refreshToken });

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}