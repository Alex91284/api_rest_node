const express = require("express")
const cors = require("cors")
const path = require("path")
const userRoutes = require("../routes/users")
const productRoutes = require("../routes/products")
const pedidoRoutes = require("../routes/pedidos")

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080
    this.paths = {
      users: "/api/users",
      products: "/api/products",
      pedidos: "/api/pedidos",
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
    this.app.use(this.paths.products, productRoutes)
    this.app.use(this.paths.pedidos, pedidoRoutes)
  }

  frontendRoutes() {
    this.app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/index.html"))
    })

    this.app.get("/user-list", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/User/user-list.html"))
    })

    this.app.get("/createUser", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/User/createUser.html"))
    })

    this.app.get("/editUser", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/User/editUser.html"))
    })

    this.app.get("/product-list", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/Product/product-list.html"))
    }
    )

    this.app.get("/crear-producto", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/Product/crear-producto.html"))
    }
    )
    
    this.app.get("/editar-producto", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/Product/editar-producto.html"))
    }
    )

    this.app.get("/pedidos-list", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/Pedido/pedidos-list.html"))
    }
    )

    this.app.get("/createPedido", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/Pedido/createPedido.html"))
    }
    )

    this.app.get("/editPedido", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/HTML/Pedido/editPedido.html"))
    }
    )
  }

  listen() {
    this.app.listen(this.port, () => {
    })
  }
}

module.exports = Server
