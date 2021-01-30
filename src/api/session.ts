import express, { Request } from 'express';
import bcrypt from 'bcrypt';

const User = require('../persistence/users');
const Session = require('../persistence/sessions');

const sessionMiddleware = require('../middleware/session-middleware');

const router = express.Router();

export interface sessionRequest extends Request {
  session: { id: string };
  userId: string;
}

router.post('/', async (request: sessionRequest, response) => {
  try {
    const {email, password} = request.body;
    // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    const user = await User.find(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return response.status(403).json({});
    }

    const sessionId = await Session.create(user.id);
    request.session.id = sessionId;
    response.status(201).json();
  } catch (error) {
    console.error(
      `POST session ({ email: ${request.body.email} }) >> ${error.stack})`
    );
    response.status(500).json();
  }
});

router.get('/', sessionMiddleware, (request: sessionRequest, response) => {
  response.json({userId: request.userId});
});

router.delete('/', async (request: sessionRequest, response) => {
  try {
    if (request.session.id) {
      await Session.delete(request.session.id);
    }

    request.session.id = null;
    response.status(200).json();
  } catch (error) {
    console.error(`DELETE session >> ${error.stack}`);
    response.status(500).json();
  }
});

export default router;
