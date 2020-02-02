export default {
  mapTech: (req, res) => {
    const techs = req.body.techs || req.query.techs;

    return techs.split(",").map(tech => tech.trim());
  },
  defineLocation: (req, res) => {
    const latitude = req.body.latitude || req.query.latitude;
    const longitude = req.body.longitude || req.query.longitude;

    return {
      type: "Point",
      coordinates: [longitude, latitude]
    };
  }
};
