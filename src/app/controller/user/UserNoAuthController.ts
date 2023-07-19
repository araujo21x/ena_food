import userService from '@services/user/UserService';
import { Request, Response } from 'express';

class UserNoAuthController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    await userService.existInDb({ email: body.email, document: body.document });
    await userService.create(body);

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  }
}

export default new UserNoAuthController();
