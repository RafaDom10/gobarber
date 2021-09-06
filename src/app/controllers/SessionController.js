import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      response.status(401).send({ error: 'User not found' });
    }

    const checkPassword = await user.checkPassword(password);

    if (!checkPassword) {
      return response.status(401).send({ error: 'Password is incorrect' });
    }

    const { id, name } = user;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return response.json({
      user: {
        id,
        name,
        email,
        token,
      },
    });
  }
}

export default new SessionController();
