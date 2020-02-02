import DevModel from "../models/Dev";

// Utils
import Auth from "../utils/Authentication/Auth";
class UserController {
  async index(req, res) {
    return;
  }

  async store(req, res) {
    try {
      const response = await DevModel.findOne({
        "user.email": { $eq: req.body.email },
        "user.password": { $eq: req.body.password }
      });

      const { _id: id } = response;
      const { _doc: data } = response;
      const UserAuth = { data, token: Auth(id) };

      if (!response) {
        return res.json({
          code: 6,
          message: "Não foi possivel fazer o login"
        });
      }

      return res.json({
        code: 1,
        response: { user: UserAuth, message: "Logado com sucesso" }
      });
    } catch (error) {
      return res.json({ code: 6, message: error.message });
    }
  }
  async show(req, res) {
    try {
      const response = await DevModel.findById(req.query.id);

      if (!response) {
        return res.json({
          code: 6,
          message: "Não foi possivel recuperar os dados"
        });
      }

      return res.json(response);
    } catch (error) {
      return res.json({ code: 6, message: error.message });
    }
  }
  async delete(req, res) {
    return;
  }
  async update(req, res) {
    try {
      const response = await DevModel.findByIdAndUpdate(req.body.iduser, {
        user: req.body
      });

      if (!response) {
        return res.json({
          code: 6,
          message: "Não foi possivel salvar o seu usuario"
        });
      }

      const { _doc: data } = response;

      return res.json({
        code: 1,
        response: { user: data, message: "Logado com sucesso" }
      });
    } catch (error) {
      return res.json({ code: 6, message: error.message });
    }
  }
}

export default new UserController();
