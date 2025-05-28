document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search)
  const userId = params.get("id")
  console.log("<<<<<<<<< user ID", userId);
  
  if (!userId) {
    alert("ID de usuario no encontrado")
    return
  }

  const form = document.getElementById("form-editar")

  try {
    const res = await fetch("/api/users")
    const users = await res.json()
    const user = users.find((u) => u.id === userId)

    console.log(userId, users)

    if (!user) {
      alert("Usuario no encontrado")
      return
    }

    form.innerHTML = `
      <input type="text" name="name" value="${user.name}" required />
      <input type="email" name="email" value="${user.email}" required />
      <input type="password" name="password" placeholder="Nuevo password" />
      <input type="text" name="role" value="${user.role || ""}" />
      <input type="text" name="state" value="${user.state || ""}" />
      <input type="text" name="google" value="${user.google || ""}" />
      <input type="file" name="foto" />
      <button type="submit">Actualizar</button>
    `;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const updateRes = await fetch(`/api/users/${userId}`, {
          method: "PUT",
          body: formData,
        });

        const result = await updateRes.json();

        if (result.ok) {
          alert("Usuario actualizado");
          window.location.href = "/";
        } else {
          alert("Error: " + result.msg);
        }
      } catch (err) {
        console.error("Error actualizando", err);
        alert("Error al actualizar");
      }
    });
  } catch (err) {
    console.error("Error cargando usuario", err);
    alert("Error al cargar usuario");
  }
});
