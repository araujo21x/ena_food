import UserRole from '@myTypes/enums/UserRole';
import UserStatus from '@myTypes/enums/UserStatus';
import userService from '@services/user/UserService';
import allowedUser from '@utils/AllowedUser';
import { Request, Response } from 'express';

class SupplierByUserController {
  public async show(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.COMPANY, UserRole.CUSTOMER]);

    const { id }: any = req.params;
    const supplier = await userService.getBy({
      id,
      status: UserStatus.ACTIVE,
      role: UserRole.SUPPLIER,
    });

    return res.status(200).json(supplier);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    await allowedUser.generic(req, [UserRole.COMPANY, UserRole.CUSTOMER]);

    const { query }: any = req;
    query.role = UserRole.SUPPLIER;
    query.status = UserStatus.ACTIVE;

    const suppliers = await userService.index(query);
    const count = await userService.count(query);

    return res.status(200).json({ suppliers, count });
  }
}

export default new SupplierByUserController();
