const User = require("../models/User");

module.exports = {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return response.status(401).json({ message: "Usuário não encontrado" });
    }

    if (!(await User.checkPassword(password, user.password))) {
      return response.status(401).json({ message: "Senha incorreta" });
    }

    return response.json({
      user,
      token: User.generateToken(user.id, user.password),
    });
  },
};
