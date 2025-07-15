import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from 'interfaces/controllers/UserController';

const router = Router();

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  UserController.register(req, res, next);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  UserController.login(req, res, next);
});

router.post('/refresh', (req: Request, res: Response, next: NextFunction) => {
  UserController.refreshToken(req, res, next);
});

export default router;