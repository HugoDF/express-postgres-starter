const Session = require('../persistence/sessions');

const sessionMiddleware = async (request, response, next) => {
  if (!request.session.id) {
    return response.sendStatus(401);
  }

  try {
    // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    const session = await Session.find(request.session.id);
    if (!session) {
      request.session.id = null;
      return response.sendStatus(401);
    }

    request.userId = session.userId;
    next();
  } catch (error) {
    console.error(
      `SessionMiddleware(${request.session.id}) >> Error: ${error.stack}`
    );
    return response.sendStatus(500);
  }
};

module.exports = sessionMiddleware;
