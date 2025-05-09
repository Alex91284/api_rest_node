class Usuario {
  constructor({
    name = "",
    email = "",
    password = "",
    img = "",
    role = "user",
    state = true,
    google = false,
  }) {
    this.name = name
    this.email = email
    this.password = password
    this.img = img
    this.role = role
    this.state = state
    this.google = google
  }
}

module.exports = Usuario
