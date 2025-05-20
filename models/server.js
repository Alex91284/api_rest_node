const express = require("express")
const cors = require("cors")
const path = require("path")
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

    // Rutas del frontend
    this.frontendRoutes()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static("public"))
  }

  routes() {
    this.app.use(this.paths.users, userRoutes)
  }

  frontendRoutes() {
    this.app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/index.html"))
    })

    this.app.get("/crear", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/crear.html"))
    })

    this.app.get("/editar", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/editar.html"))
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`)
    })
  }
}

module.exports = Server
