const express = require('express');

const {Router} = express;
const router = new Router();

const user = require('./user');
const session = require('./session');

router.use('/api/users', user);
router.use('/api/sessions', session);

module.exports = router;
