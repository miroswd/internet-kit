const { redisConnection } = require('../../database/redis');

class HealthController {
  async handle(req, res) {
    const { name } = req.query;
    if (name) {
      const user = await redisConnection.get('user');

      if (!user) {
        redisConnection.set('user', String(name));
      }

      return res.status(200).json({ user, name });
    }

    return res.status(200).json({
      success: true,
      message: 'Failed to connect with redis',
    });
  }
}

module.exports = HealthController;
