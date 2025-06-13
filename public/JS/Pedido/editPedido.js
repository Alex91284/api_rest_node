document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search)
  const pedidoId = params.get("id")
  const form = document.getElementById("form-editar-pedido")

  if (!pedidoId) {
    alert("ID del pedido no encontrado")
    return
  }

  try {
    const res = await fetch("/api/pedidos")
    const pedidos = await res.json()
    const pedido = pedidos.find((ped) => ped.id === pedidoId)

    if (!pedido) {
      alert("Pedido no encontrado")
      return
    }

    form.innerHTML = `
      <input type="text" name="client" value="${pedido.cliente}" />
      <textarea type="text" name="products"  rows="6">
      ${pedido.productos.map((producto) => `${producto}`).join("\n")}
      </textarea>
      <input type="number" name="total" value="${pedido.total}" />
      <input type="text" name="state" value="${pedido.estado || ""}" />
      <input type="text" name="ventor" value="${pedido.vendedor || ""}" />
      <button type="submit">Actualizar</button>
    `

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form)

      try {
        const updateRes = await fetch(`/api/pedidos/${pedidoId}`, {
          method: "PUT",
          body: formData,
        })

        const result = await updateRes.json()

        if (result.ok) {
          alert("Pedido actualizado")
          window.location.href = "/"
        } else {
          alert("Error: " + result.msg)
        }
      } catch (err) {
        console.error("Error actualizando", err)
        alert("Error al actualizar")
      }
    })
  } catch (err) {
    console.error("Error cargando pedido", err)
    alert("Error al cargar pedido")
  }
})
