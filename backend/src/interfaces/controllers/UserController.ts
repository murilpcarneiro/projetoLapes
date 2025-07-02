// src/interfaces/controllers/UserController.ts
import { LoginUser } from 'app/use-cases/user/LoginUser';
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
      next(error); // Deixa o middleware global de erro cuidar disso
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
}
