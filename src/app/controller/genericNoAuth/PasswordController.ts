import { Request, Response } from 'express';

import Mail from '@lib/Mail';
import passwordService from '@services/genericNoAuth/PasswordService';
import getEmailBody from '@utils/getEmailBody';
import userService from '@services/user/UserService';
import UserStatus from '@myTypes/enums/UserStatus';

class PasswordController {
  public async forgot(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    await userService.getBy({ email, status: UserStatus.ACTIVE });
    const code = await passwordService.forgot(email);

    await Mail.sendMail(
      getEmailBody(email, { recoveryPasswordCode: code }, 'forgotPassword')
    );

    return res.status(200).json({
      message: 'O código de recuperação de senha foi enviado para seu E-mail.',
    });
  }

  public async reset(req: Request, res: Response): Promise<Response> {
    const user = await passwordService.getUserByCodeReset(req.body.code);
    passwordService.resetTokenIsValid(user.passwordResetExpires as Date);
    await passwordService.reset(user.id, req.body.password);

    return res.status(200).json({ message: 'Senha atualizada com sucesso!' });
  }
}

export default new PasswordController();
