import DevModel from "../models/Dev";

class SourceController {
  async index(req, res, next) {
    console.log(req.query);
    const { latitude, longitude, newTechs } = req.query;
    try {
      const devs = await DevModel.find({
        techs: {
          $in: newTechs
        },
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000
          }
        }
      });

      return res.json(devs);
    } catch (error) {
      return res.json(error.message);
    }
  }
  async show(req, res, next) {}
  async store(req, res, next) {}
  async update(req, res, next) {}
  async delete(req, res, next) {}
}

export default new SourceController();
