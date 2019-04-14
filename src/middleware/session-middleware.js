const Session = require('../persistence/sessions');

const sessionMiddleware = async (req, res, next) => {
  if (!req.session.id) {
    return res.sendStatus(401);
  }

  try {
    const session = await Session.find(req.session.id);
    if (!session) {
      req.session.id = null;
      return res.sendStatus(401);
    }

    req.userId = session.userId;
    next();
  } catch (error) {
    console.error(
      `SessionMiddleware(${req.session.id}) >> Error: ${error.stack}`
    );
    return res.sendStatus(500);
  }
};

module.exports = sessionMiddleware;
