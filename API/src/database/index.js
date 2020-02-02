import mongoose from "mongoose";

class Database {
  constructor() {
    this.init();
  }

  init() {
    try {
      mongoose.connect(
        "mongodb+srv://omninstack:omninstack@cluster0-styjy.mongodb.net/week10?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useFindAndModify: true,
          useUnifiedTopology: true
        },
        error => {
          if (error) {
            console.log(
              "Não foi possivel se conectar ao banco de dados MongoDB @omninstack",
              error.message
            );
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new Database();
