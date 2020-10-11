const User = require("../models/User");

module.exports = {
  async store(request, response) {
    const { name, email, password } = request.body;

    const hasUser = await User.findOne({ where: { email } });

    if (!hasUser) {
      const users = await User.create({
        name,
        email,
        password,
      });

      return response.json(users);
    } else {
      return response.json({ message: "Já existe um usuário com esse email" });
    }
  },
};
