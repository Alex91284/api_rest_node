document.getElementById("form-crear").addEventListener("submit", async (e) => {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)

  try {
    const res = await fetch("/api/users", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (data.ok) {
      alert("Usuario creado correctamente")
      window.location.href = "/"
    } else {
      alert("Error: " + data.msg)
    }
  } catch (err) {
    console.error("Error al crear usuario", err)
    alert("Error al crear usuario")
  }
})

document.getElementById("foto").addEventListener("change", function () {
  const file = this.files[0]
  const preview = document.getElementById("preview")

  if (file) {
    const reader = new FileReader()
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block"
    }
    reader.readAsDataURL(file)
  } else {
    preview.src = ""
    preview.style.display = "none"
  }
})