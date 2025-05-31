document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/products")
    const products = await res.json()

    const container = document.getElementById("productos-container")
    container.innerHTML = ""

    products.forEach((product) => {
      const div = document.createElement("div")
      div.classList.add("card")
      div.style.marginBottom = "10px"

      div.innerHTML = `
        <section class="card-header">
          <h2 class="card-title">${product.name}</h2>
        </section>
        <section class="card-body">
          ${
            product.fotoUrl
              ? `<img src="${product.fotoUrl}" width="150" />`
              : "Sin foto"
          }<br>
        </section>
        <section class="card-footer">
          <button onclick="editarProducto('${product.id}')">Editar</button>
          <button class="eliminar-btn">Eliminar</button>
        </section>
      `

      const eliminarBtn = div.querySelector(".eliminar-btn")
      eliminarBtn.addEventListener("click", async () => {
        const confirmacion = confirm(
          "¿Estás seguro de que deseas eliminar este producto?"
        )

        if (confirmacion) {
          try {
            const res = await fetch(`/api/products/${product.id}`, {
              method: "DELETE",
            })
            const data = await res.json()

            if (data.ok) {
              alert("Producto eliminado")
              location.reload()
            } else {
              alert("Error al eliminar: " + data.msg)
            }
          } catch (error) {
            console.error("Error eliminando producto:", error)
            alert("Ocurrió un error al intentar eliminar al producto.")
          }
        }
      })

      container.appendChild(div)
    })
  } catch (err) {
    console.error("Error al cargar productos:", err)
  }
})

function editarProducto(id) {
  window.location.href = `/editar-producto?id=${id}`
}
