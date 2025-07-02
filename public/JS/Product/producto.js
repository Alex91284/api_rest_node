document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const detalle = document.getElementById("detalle-producto");
  const zoom = document.getElementById("zoom-container");

  if (!detalle || !zoom) return;

  try {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();

    const producto = data.producto || data;

    // Mostrar detalles
    detalle.innerHTML = `
      ${
        producto.fotoUrl
          ? `<img src="${producto.fotoUrl}" width="150" />`
          : "Sin foto"
      }
      <h1>${producto.name}</h1>
      <p>${producto.description}</p>
      <p><strong>Precio:</strong> $${producto.price}</p>
    `;

    // Mostrar imagen con lupa
    if (producto.fotoUrl) {
      zoom.innerHTML = `
        <div id="zoom-wrapper" style="position: relative; display: inline-block;">
          <img id="zoom-image" src="${producto.fotoUrl}" alt="Producto" style="width: 500px;" />
          <div id="zoom-lens"></div>
        </div>
      `;

      const image = document.getElementById("zoom-image");
      const lens = document.getElementById("zoom-lens");
      const wrapper = document.getElementById("zoom-wrapper");

      if (!image || !lens || !wrapper) return;

      // Estilo base del lente
      Object.assign(lens.style, {
        position: "absolute",
        border: "2px solid #000",
        width: "100px",
        height: "100px",
        backgroundRepeat: "no-repeat",
        pointerEvents: "none",
        visibility: "hidden",
        zIndex: 100,
        backgroundImage: `url(${image.src})`,
        backgroundSize: `${image.width * 2}px ${image.height * 2}px`,
      });

      const zoomFactor = 2;

      image.addEventListener("mouseenter", () => {
        lens.style.visibility = "visible";
      });

      image.addEventListener("mouseleave", () => {
        lens.style.visibility = "hidden";
      });

      image.addEventListener("mousemove", (e) => moveLens(e));

      function moveLens(e) {
        const rect = image.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const lensWidth = lens.offsetWidth;
        const lensHeight = lens.offsetHeight;

        let left = x - lensWidth / 2;
        let top = y - lensHeight / 2;

        // Limitar dentro de la imagen
        left = Math.max(0, Math.min(left, image.width - lensWidth));
        top = Math.max(0, Math.min(top, image.height - lensHeight));

        // Posicionar el lens
        lens.style.left = `${left}px`;
        lens.style.top = `${top}px`;

        // Posicionar fondo ampliado
        lens.style.backgroundPosition = `-${left * zoomFactor}px -${
          top * zoomFactor
        }px`;
      }
    }
  } catch (err) {
    detalle.innerText = "Error al cargar producto.";
    zoom.innerText = "Error al cargar imagen.";
    console.error(err);
  }
});
