document.getElementById("form-crear-pedido").addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = e.target

    const pedido = {
      cliente: form.client.value,
      productos: form.products.value
        .split("\n") // ← cada línea será un producto
        .filter((p) => p.trim() !== ""), // ← eliminar líneas vacías
      total: parseFloat(form.total.value),
      estado: form.state.value,
      vendedor: form.ventor.value,
    }

    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      })

      const data = await res.json()

      if (data.ok) {
        alert("Pedido creado exitosamente")
        window.location.href = "/"
      } else {
        alert("Error: " + (data.msg || "No se pudo crear el pedido"))
      }
    } catch (err) {
      console.error("Error en la solicitud:", err)
      alert("Error al conectar con el servidor")
    }
  })

