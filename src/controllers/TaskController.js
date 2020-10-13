const User = require("../models/User");
const Task = require("../models/Task");

module.exports = {
  async index(request, response) {
    const { user_id } = request.params;

    const user = await User.findByPk(user_id, {
      include: { association: "tasks" },
    });

    if (!user) {
      return response.status(400).json({ message: "Nenhuma task encontrada" });
    }

    return response.json(user.tasks);
  },
  async getOneTask(request, response) {
    const { task_id } = request.params;

    const task = await Task.findByPk(task_id);

    if (!task) {
      return response.status(400).json({ message: "Nenhuma task encontrada" });
    }

    return response.json(task);
  },
  async store(request, response) {
    const { user_id } = request.params;
    const { name, description, status } = request.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return response.status(400).json({ message: "Usuário não encontrado" });
    }

    const task = await Task.create({
      name,
      description,
      status,
      user_id,
    });

    return response.json(task);
  },
  async update(request, response) {
    const { user_id, task_id } = request.params;

    const { name, description, status } = request.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return response.status(400).json({ message: "Usuário não encontrado" });
    }

    const task = await Task.findByPk(task_id);

    if (!task) {
      return response.status(400).json({ message: "Tarefa não encontrada" });
    }

    try {
      await task.update({
        name: name,
        description: description,
        status: status,
      });
    } catch (err) {
      return response.status(500).json({ message: "Não foi possível atualizar a task", err });
    }

    return response.json(task);
  },
  async delete(request, response) {
    const { user_id, task_id } = request.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return response.status(400).json({ message: "Usuário não encontrado" });
    }

    const task = await Task.findByPk(task_id);

    if (!task) {
      return response.status(400).json({ message: "Tarefa não encontrada" });
    }

    await task.destroy();

    return response.json();
  },
};
