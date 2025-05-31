document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search)
  const productId = params.get("id")
  const form = document.getElementById("form-editar-producto")

  if (!productId) {
    alert("ID de producto no encontrado")
    return
  }

  try {
    const res = await fetch("/api/products")
    const products = await res.json()
    const product = products.find((u) => u.id === productId)

    if (!product) {
      alert("Usuario no encontrado")
      return
    }

    form.innerHTML = `
      <div class="avatar-container">
        <label for="fotoInput" class="avatar-label">
          <img
            id="preview"
            src="${product.fotoUrl || "/images/silueta-user.png"}"
            alt="Foto de producto"
            class="avatar-img"
          />
          <div class="hover-text">Cambiar Foto</div>
        </label>
        <input type="file" name="foto" id="fotoInput" style="display: none" />
      </div>

      <input type="text" name="name" value="${product.name}" required />
      <input type="price" name="price" value="${product.price}" required />
      <input type="text" name="description" value="${product.description || ""}" />
      <input type="text" name="category" value="${product.category || ""}" />
      <input type="text" name="stock" value="${product.stock || ""}" />
      <button type="submit">Actualizar</button>
    `

    const fileInput = document.getElementById("fotoInput")
    const preview = document.getElementById("preview")

    fileInput.addEventListener("change", function () {
      const file = this.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = function (e) {
          preview.src = e.target.result
        }
        reader.readAsDataURL(file)
      }
    })

    form.addEventListener("submit", async (e) => {
      e.preventDefault()
      const formData = new FormData(form)

      try {
        const updateRes = await fetch(`/api/products/${productId}`, {
          method: "PUT",
          body: formData,
        })

        const result = await updateRes.json()

        if (result.ok) {
          alert("Producto actualizado")
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
    console.error("Error cargando producto", err)
    alert("Error al cargar producto")
  }
})
