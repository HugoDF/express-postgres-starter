//const express = require('express');
import express  from 'express';
//const {Router} = express;
//const app = express();
const router = express.Router();

const user = require('./user');
//const session = require('./session');

router.get('/test', (request, response) =>{
  console.log('test342357d');
  return response.status(200)
    .json({message: 'paresh'});
});

router.use('/api/users', user);
//router.use('/api/sessions', session);

//module.exports = router;
export default router;
