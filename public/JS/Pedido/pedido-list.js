function convertirFechaFirestore(fecha) {
  if (fecha && typeof fecha._seconds === "number") {
    return new Date(fecha._seconds * 1000); // convertir segundos a milisegundos
  }
  return null;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/pedidos");
    const pedidos = await res.json();

    const container = document.getElementById("pedidos-container");
    container.innerHTML = "";

    pedidos.forEach((pedido) => {

      const fechaObj = convertirFechaFirestore(pedido.fecha)
      
      const fechaFormateada = fechaObj
        ? fechaObj.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Fecha no disponible";

      const div = document.createElement("div");
      div.classList.add("card");
      div.style.marginBottom = "10px";

      div.innerHTML = `
        <section class="card-header">
          <h2 class="card-title">Factura de Venta</h2>
          </section>
          <section class="card-body">
          <p><strong>Fecha:</strong> ${fechaFormateada}</p>
          <p><strong>Cliente:</strong> ${pedido.cliente}</p>
          <p><strong>Estado:</strong> ${pedido.estado}</p>
          <p><strong>Vendedor:</strong> ${pedido.vendedor}</p>
          <br>
          <p><strong>Productos:</strong></p>
          <br>
          <ul>
            ${pedido.productos
              .map((producto) => `<li>${producto}</li>`)
              .join("")}
          </ul>
          <br>
          <p><strong>Total:</strong> $${pedido.total.toFixed(2)}</p>
        </section>
        <section class="card-footer">
          <button onclick="editPedido('${pedido.id}')">Editar</button>
          <button class="eliminar-btn">Eliminar</button>
        </section>
      `;

      const eliminarBtn = div.querySelector(".eliminar-btn");
      eliminarBtn.addEventListener("click", async () => {
        const confirmacion = confirm(
          "¿Estás seguro de que deseas eliminar este pedido?"
        );

        if (confirmacion) {
          try {
            const res = await fetch(`/api/pedidos/${pedido.id}`, {
              method: "DELETE",
            });
            const data = await res.json();

            if (data.ok) {
              alert("Pedido eliminado");
              location.reload();
            } else {
              alert("Error al eliminar: " + data.msg);
            }
          } catch (error) {
            console.error("Error eliminando pedido:", error);
            alert("Ocurrió un error al intentar eliminar al pedido.");
          }
        }
      });

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error al cargar pedidos:", err);
  }
});

function editPedido(id) {
  window.location.href = `/editPedido?id=${id}`;
}
