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
    <h2 class="card-title">Pedido #${pedido.num_pedido}</h2>
  
    <label>Cliente</label>
    <input type="text" id="cliente" name="cliente" value="${pedido.cliente}" />
  
    <label>Productos</label>
    <textarea id="productos" name="productos" rows="6">${pedido.productos.join(
      "\n"
    )}</textarea>
  
    <label>Total</label>
    <input type="number" id="total" name="total" value="${pedido.total}" />
    <p>Total en COP: <strong>${new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(Number(pedido.total))}</strong></p>
  
    <label>Estado</label>
    <input type="text" id="estado" name="estado" value="${
      pedido.estado || ""
    }" />
  
    <label>Vendedor</label>
    <input type="text" id="vendedor" name="vendedor" value="${
      pedido.vendedor || ""
    }" />
  
    <button type="submit">Actualizar</button>
  `
    form.addEventListener("submit", async (e) => {
      e.preventDefault()
      
      const cliente = document.getElementById("cliente").value.trim()
      const productos = document
        .getElementById("productos")
        .value.split("\n")
        .map((p) => p.trim())
        .filter(Boolean)

      const total = Number(document.getElementById("total").value)
      const estado = document.getElementById("estado").value.trim()
      const vendedor = document.getElementById("vendedor").value.trim()

      const datosActualizados = {
        cliente,
        productos,
        total,
        estado,
        vendedor,
      }

      try {
        const updateRes = await fetch(`/api/pedidos/${pedidoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosActualizados),
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
