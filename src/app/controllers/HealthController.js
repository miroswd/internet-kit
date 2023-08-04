const { redisConnection } = require('../../database/redis');

class HealthController {
  async handle(req, res) {
    if (req.query.name) {
      const user = await redisConnection.get('user');
      return res.status(200).json({ user });
    }

    return res.status(200).json({
      success: true,
      message: 'Failed to connect with redis',
    });
  }
}

module.exports = HealthController;
