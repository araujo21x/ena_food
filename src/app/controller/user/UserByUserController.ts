import userService from '@services/user/UserService';
import allowedUser from '@utils/AllowedUser';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

class UserByUserController {
  public async showSelf(req: Request, res: Response): Promise<Response> {
    const user = await allowedUser.generic(req);

    return res.status(200).json({ user });
  }

  public async editSelf(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id }: any = req.params;

    const user = await userService.edit(body, id as Types.ObjectId);

    return res
      .status(200)
      .json({ message: 'Usuário editado com sucesso!', user });
  }
}

export default new UserByUserController();
