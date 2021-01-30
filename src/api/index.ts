import express from 'express';
import session from './session';

const router = express.Router();

import user from './user';

router.get('/test', (request, response) =>{
  return response.status(200)
    .json({message: 'paresh'});
});

router.use('/api/users', user);
router.use('/api/sessions', session);

export default router;
