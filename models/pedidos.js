class Pedido {
  constructor({
    num_pedido = 0,
    cliente = "",
    productos = [],
    total = 0,
    estado = "pendiente",
    vendedor = "",
  }) {
    this.num_pedido = num_pedido
    this.fecha = fecha || new Date()
    this.cliente = cliente
    this.productos = productos
    this.total = total
    this.estado = estado
    this.vendedor = vendedor
  }
}

module.exports = Pedido
