// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const res = await fetch("/api/users")
//     const users = await res.json()

//     const container = document.getElementById("usuarios-container")
//     container.innerHTML = ""  


//     users.forEach((user) => {
//       const div = document.createElement("div")
//       div.classList.add("card")
//       div.style.marginBottom = "10px"

//       div.innerHTML = `
//         <section class="card-header">
//           <h2 class="card-title">${user.name}</h2>
//         </section>
//         <section class="card-body">
//           ${
//             user.fotoUrl
//               ? `<img src="${user.fotoUrl}" width="150" />`
//               : "Sin foto"
//           }<br>
//         </section>
//         <section class="card-footer">
//           <button onclick="editarUsuario('${user.id}')">Editar</button>
//           <button class="eliminar-btn">Eliminar</button>
//         </section>
//       `

//       const eliminarBtn = div.querySelector(".eliminar-btn")
//       eliminarBtn.addEventListener("click", async () => {
//         const confirmacion = confirm(
//           "¿Estás seguro de que deseas eliminar este usuario?"
//         )

//         if (confirmacion) {
//           try {
//             const res = await fetch(`/api/users/${user.id}`, {
//               method: "DELETE",
//             });
//             const data = await res.json()

//             if (data.ok) {
//               alert("Usuario eliminado")
//               location.reload()
//             } else {
//               alert("Error al eliminar: " + data.msg)
//             }
//           } catch (error) {
//             console.error("Error eliminando usuario:", error)
//             alert("Ocurrió un error al intentar eliminar al usuario.")
//           }
//         }
//       })

//       container.appendChild(div)
//     })
    
//   } catch (err) {
//     console.error("Error al cargar usuarios:", err)
//   }
// })

// function editarUsuario(id) {
//   window.location.href = `/editar?id=${id}`
// }
