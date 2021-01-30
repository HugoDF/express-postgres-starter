const User = require('../persistence/users');
import express from "express";

const router = express.Router();

router.get('/test', (request, response) =>{
  return response.status(200)
    .json({message: 'paresh'});
});

router.post('/', async (request, response) => {
  try {
    let {email, password}: {email: string,  password: string} = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({message: 'email and password must be provided'});
    }

    const user = await User.create(email, password);
    if (!user) {
      return response.status(400).json({message: 'User already exists'});
    }

    return response.status(200).json(user);
  } catch (error) {
    console.error(
      `createUser({ email: ${request.body.email} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  }
});

export default router;
