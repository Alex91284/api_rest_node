// const { response, request } = require("express");
// const db = require("../database/firebase"); // ✅ Importa solo una vez

// const usersGet = async (req = request, res = response) => {
//   try {
//     const snapshot = await db.collection("users").get();
//     const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error al obtener usuarios");
//   }
// };

// const usersPost = async (req, res = response) => {
//   try {
//     const body = req.body;
//     const docRef = await db.collection("users").add(body);

//     res.json({
//       msg: "Usuario agregado correctamente",
//       id: docRef.id,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error al agregar usuario");
//   }
// };

// const userPut = (req, res = response) => {
//   const { id } = req.params;
//   res.json({
//     msg: "put API",
//     id,
//   });
// };

// const usersPatch = (req, res = response) => {
//   res.json({
//     msg: "patch API",
//   });
// };

// const usersDelete = (req, res = response) => {
//   res.json({
//     msg: "delete API",
//   });
// };

// module.exports = {
//   usersGet,
//   usersPost,
//   userPut,
//   usersPatch,
//   usersDelete,
// };
const express = require("express")
const cors = require("cors")
const userRoutes = require("../routes/users")

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080
    this.paths = {
      users: "/api/users",
    }

    // Middlewares
    this.middlewares()

    // Rutas
    this.routes()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.paths.users, userRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`)
    })
  }
}

module.exports = Server
