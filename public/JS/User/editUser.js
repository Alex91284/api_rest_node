document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search)
  const userId = params.get("id")
  const form = document.getElementById("form-editar")

  if (!userId) {
    alert("ID de usuario no encontrado")
    return
  }

  try {
    const res = await fetch("/api/users")
    const users = await res.json()
    const user = users.find((u) => u.id === userId)

    if (!user) {
      alert("Usuario no encontrado")
      return
    }

    form.innerHTML = `
      <div class="avatar-container">
        <label for="fotoInput" class="avatar-label">
          <img
            id="preview"
            src="${user.fotoUrl || "/images/silueta-user.png"}"
            alt="Foto de usuario"
            class="avatar-img"
          />
          <div class="hover-text">Cambiar Foto</div>
        </label>
        <input type="file" name="foto" id="fotoInput" style="display: none" />
      </div>

      <input type="text" name="name" value="${user.name}" required />
      <input type="email" name="email" value="${user.email}" required />
      <input type="password" name="password" placeholder="Nuevo password" />
      <input type="text" name="role" value="${user.role || ""}" />
      <input type="text" name="state" value="${user.state || ""}" />
      <input type="text" name="google" value="${user.google || ""}" />
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
        const updateRes = await fetch(`/api/users/${userId}`, {
          method: "PUT",
          body: formData,
        })

        const result = await updateRes.json()

        if (result.ok) {
          alert("Usuario actualizado")
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
    console.error("Error cargando usuario", err)
    alert("Error al cargar usuario")
  }
})
