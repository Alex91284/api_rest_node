class Producto {
  constructor({
    name = "",
    price = 0,
    description = "",
    img = "",
    category = null,
    stock = true,
  }) {
    this.name = name
    this.price = price
    this.description = description
    this.img = img
    this.category = category
    this.stock = stock
  }
}

module.exports = Producto