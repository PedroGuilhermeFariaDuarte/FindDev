import DevModel from "../models/Dev";

// Services
import api from "../services/Api/api";

//Utils
import AuthToken from "../utils/Authentication/Auth";
import { findConnections, sendMessage } from "../utils/WebSocket";

class DevController {
  async index(req, res, next) {
    try {
      const devs = await DevModel.find();

      return res.json(devs);
    } catch (error) {
      return res.json({ message: error.message });
    }
  }
  async show(req, res, next) {
    const github_username =
      req.body.github_username || req.params.github_username;

    const dev = await DevModel.findOne({ github_username });

    if (dev) {
      return res.json({
        code: 2,
        message: `O dev ${github_username} já existe!`
      });
    }

    next();
  }
  async store(req, res, next) {
    const {
      github_username,
      newTechs,
      location,
      longitude,
      latitude
    } = req.body;

    try {
      const response = await api.get(`/users/${github_username}`);

      const { name = login, avatar_url, bio } = response.data;

      const dev = await DevModel.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: newTechs,
        location,
        user: { name }
      });

      /* 
      Filtrar as conexoes, que estejam a 10km de distancia e que o novo dev tenha
      pelo menos uma das tecnologias das conexoes
       */
      const sendSocketMessageTo = findConnections(
        { longitude, latitude },
        newTechs
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);

      const token = await AuthToken(dev._id);
      const AuthDev = { ...dev, token };

      return res.json({ code: 1, response: { user: dev, token: AuthDev } });
    } catch (error) {
      return res.json({ code: 6, error: error.message });
    }
  }
  async delete(req, res, next) {
    return res.json({});
  }
  async update(req, res, next) {
    return res.json({});
  }
}

export default new DevController();
