document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/users")
    const users = await res.json()

    const container = document.getElementById("usuarios-container")

    users.forEach((user) => {
      const div = document.createElement("div")
      div.style.marginBottom = "20px"

      div.innerHTML = `
        <strong>Nombre:</strong> ${user.name}<br>
        <strong>Email:</strong> ${user.email}<br>
        ${user.fotoUrl ? `<img src="${user.fotoUrl}" width="150">` : "Sin foto"}
      `

      container.appendChild(div)
    })
  } catch (err) {
    console.error("Error al cargar usuarios:", err)
  }
})
