class Pedido {
  constructor({
    cliente = "",
    productos = [],
    total = 0,
    estado = "pendiente",
    vendedor = "",
  }) {
    this.fecha = fecha || new Date()
    this.cliente = cliente
    this.productos = productos
    this.total = total
    this.estado = estado
    this.vendedor = vendedor
  }
}

module.exports = Pedido
