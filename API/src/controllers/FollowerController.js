import DevModel from "../models/Dev";

class FollowerController {
  async store(req, res) {
    const { seguidorID } = req.body;
    const { idusuario } = req.body;
    try {
      const seguidor = await DevModel.findById(seguidorID);

      const { github_username, avatar_url } = seguidor;
      const { email } = seguidor.user;

      // Atualizando a lista de seguidores do usuario
      let seguindo = await DevModel.findByIdAndUpdate(idusuario, {
        $push: {
          followers: {
            idseguidor: seguidorID,
            github_username,
            avatar_url,
            email
          }
        }
      });

      if (!seguindo) {
        return res.json({
          code: 6,
          message: "Não foi possivel seguir este perfil"
        });
      }

      // Atualizando a lista de seguindo do seguidor
      const {
        github_username: github_seguindo,
        avatar_url: avatar_seguindo
      } = seguindo;
      const { email: email_seguindo } = seguindo.user;

      await DevModel.findByIdAndUpdate(seguidorID, {
        $push: {
          following: {
            idseguindo: idusuario,
            github_seguindo,
            avatar_seguindo,
            email_seguindo
          }
        }
      });

      // Recuperando os dados do usuario
      seguindo = await DevModel.findById(idusuario);

      return res.json({
        code: 1,
        response: seguindo.followers
      });
    } catch (error) {
      return res.json({ code: 6, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { seguidorID, idusuario } = req.query;

      let seguindo = await DevModel.findByIdAndUpdate(req.query.idusuario, {
        $pull: {
          followers: { idseguidor: seguidorID }
        }
      });

      await DevModel.update(
        { _id: seguidorID },
        {
          $pull: {
            following: { idseguindo: idusuario }
          }
        }
      );

      if (!seguindo) {
        toast.error("Não foi possivel realizar esta operação");
      }

      // Recuperando os dados do usuario
      seguindo = await DevModel.findById(idusuario);

      return res.json({
        code: 1,
        response: seguindo.followers
      });
    } catch (error) {
      return res.json({ code: 6, message: error.message });
    }
  }
}

export default new FollowerController();
