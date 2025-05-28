document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/users")
    const users = await res.json()

    const container = document.getElementById("usuarios-container")
    container.innerHTML = ""  


    users.forEach((user) => {
      const div = document.createElement("div")
      div.classList.add("card")
      div.style.marginBottom = "10px"

      div.innerHTML = `
       <section class="card-header">
          <h2 class="card-title">${user.name}</h2>
        </section>
        <section class="card-body">
          ${
            user.fotoUrl ? `<img src="${user.fotoUrl}" width="150"` : "Sin foto"
          }<br>
        </section>
        <section class="card-footer">
          <button onclick="editarUsuario('${user.id}')">Editar</button>
          <button class="eliminar-btn" data-id="${user.id}">Eliminar</button>
        </section>
      `
      container.appendChild(div)
    })
  } catch (err) {
    console.error("Error al cargar usuarios:", err)
  }
})
function editarUsuario(id) {
  window.location.href = `/editar?id=${id}`
}
