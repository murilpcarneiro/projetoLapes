import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from 'interfaces/controllers/UserController';

const router = Router();

// Função intermediária para garantir os tipos corretos
router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  UserController.register(req, res, next);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  UserController.login(req, res, next);
});
export default router;
